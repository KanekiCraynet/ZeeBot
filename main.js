/**
 * ZeeBot - WhatsApp Bot Framework
 * 
 * Originally based on Yuta-Okkotsu by Axel
 * Optimized version by Claude
 * Original creator: Dekuganz
 */

'use strict';

(async () => {
  // Import required modules
  const {
    default: makeWASocket,
    useMultiFileAuthState,
    jidNormalizedUser,
    Browsers,
    proto,
    makeInMemoryStore,
    DisconnectReason,
    getAggregateVotesInPollMessage,
    areJidsSameUser,
  } = require("baileys");
  
  // System modules
  const pino = require("pino");
  const { Boom } = require("@hapi/boom");
  const chalk = require("chalk");
  const readline = require("node:readline");
  const fs = require("node:fs");
  const path = require("node:path");
  const moment = require("moment-timezone");
  
  // Local modules
  const simple = require("./lib/simple.js");
  const Func = require("./lib/function.js");
  const Queque = require("./lib/queque.js");
  const Database = require("./lib/database.js");
  const serialize = require("./lib/serialize.js");
  const config = require("./settings.js");
  const pkg = require("./package.json");
  
  // Initialize message queue
  const messageQueue = new Queque();
  
  // Define global variables to prevent reference errors
  global.client = global.conn = global.DekuGanz = null;
  
  /**
   * Appends a text message to the chat
   * @param {Object} m - Message object
   * @param {Object} sock - Socket connection
   * @param {String} text - Text message to append
   * @param {Object} chatUpdate - Chat update object
   * @returns {Promise}
   */
  const appendTextMessage = async (m, sock, text, chatUpdate) => {
    // Use the sock parameter directly
    let messages = await sock.generateWAMessage(
      m.key.remoteJid,
      { text },
      { quoted: m.quoted }
    );
    
    messages.key.fromMe = areJidsSameUser(m.sender, sock.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    
    if (m.isGroup) messages.participant = m.sender;
    
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    
    return sock.ev.emit("messages.upsert", msg);
  };

  /**
   * Creates an interactive CLI question
   * @param {String} text - Question text
   * @returns {Promise<String>} - User response
   */
  const question = (text) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    return new Promise((resolve) => {
      rl.question(text, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  };
  
  // Initialize database
  global.db = new Database(`${config.database}.json`);
  await db.init();

  // Initialize plugins
  global.pg = new (await require(path.join(process.cwd(), "/lib/plugins")))(
    path.join(process.cwd(), "/system/plugins")
  );
  await pg.watch();

  // Initialize scrapers
  global.scraper = new (await require(path.join(process.cwd(), "/scrapers")))(
    path.join(process.cwd(), "/scrapers/src")
  );
  await scraper.watch();

  // Auto-save and reload
  setInterval(async () => {
    try {
      await db.save();
      await pg.load();
      await scraper.load();
    } catch (error) {
      console.error('Error during auto-save:', error);
    }
  }, 5000); // Increased interval for better performance

  // Initialize in-memory store
  const store = makeInMemoryStore({
    logger: pino().child({
      level: "silent",
      stream: "store",
    }),
  });
  
  // Display welcome banner
  console.log(chalk.blue.bold(`
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSS%%SSSS%%%%%?%SSSSSSSSSSSSSSSSSS%%
%SSSS%%%%%%%%%%%SS%%SS%%%%%%%%%%%%%%%%%%%%%SSSSSSSSSSSSSSSSSSSSS%%%%%%SSSSSSSSSSSSSSSSSSSS
SSSSSSSSSS%%%%SSSSSSSS%SS%%S%S%%%%%%%%**%%%SSSSSSSSSSSSSSSSSSS%??%%SS%%SSSSSSSSSSSSSSSSSSS
  Welcome to ZeeBot WhatsApp Integration`));
  console.log(chalk.blue.bold(`Based on Yuta-Okkotsu-Botz / DekuGanz`));
  
  // Display initialization info
  console.log(chalk.yellow.bold("📁     Initializing modules..."));
  console.log(chalk.cyan.bold("- Baileys API Loaded"));
  console.log(chalk.cyan.bold("- File System Ready"));
  console.log(chalk.cyan.bold("- Database Initialized"));

  console.log(chalk.blue.bold("\n🤖 Bot Info:"));
  console.log(chalk.white.bold("  | GitHub: ") + chalk.cyan.bold("https://github.com/LeooxzyDekuu"));
  console.log(chalk.white.bold("  | Developer: ") + chalk.green.bold("Leooxzy/Deku"));
  console.log(chalk.white.bold("  | Base Script: ") + chalk.green.bold("AxellNetwork"));
  console.log(chalk.white.bold("  | Status Server: ") + chalk.green.bold("Online"));
  console.log(chalk.white.bold("  | Version: ") + chalk.magenta.bold(pkg.version));
  console.log(chalk.white.bold("  | Node.js Version: ") + chalk.magenta.bold(process.version));
  
  console.log(chalk.blue.bold("\n🔁 Loading plugins and scrapers..."));

  /**
   * Main system function to initialize WhatsApp connection
   * @returns {Object} Socket connection
   */
  async function startConnection() {
    try {
      // Initialize session state - Fix for sessions error
      const { state, saveCreds } = await useMultiFileAuthState(config.sessions);
      
      // Create WhatsApp socket connection
      const sock = simple(
        {
          logger: pino({ level: "silent" }),
          printQRInTerminal: false,
          auth: state,
          version: [2, 3000, 1019441105],
          browser: Browsers.ubuntu("Edge"),
          connectTimeoutMs: 60000,
          keepAliveIntervalMs: 30000,
          retryRequestDelayMs: 2000,
        },
        store,    
      );
      
      // Set global references
      global.client = global.conn = global.DekuGanz = sock;
      
      // Bind store to socket events
      store.bind(sock.ev);
      
      // Handle pairing code for new sessions
      if (!sock.authState.creds.registered) {
        console.log(
          chalk.white.bold(
            "- Please enter your WhatsApp number, e.g., +628xxxx",
          ),
        );
        const phoneNumber = await question(chalk.green.bold(`– Your Number: `));
        try {
          const code = await sock.requestPairingCode(phoneNumber, "LEOODEKU");
          setTimeout(() => {
            console.log(chalk.white.bold("- Your Pairing Code: " + chalk.green.bold(code)));
          }, 3000);
        } catch (error) {
          console.error(chalk.red.bold("Error requesting pairing code:"), error);
          process.exit(1);
        }
      }

      // Connection update handler
      sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === "close") {
          const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
          console.log(chalk.yellow.bold(`Connection closed. Reason: ${lastDisconnect?.error || "Unknown"}`));
          
          switch (reason) {
            case DisconnectReason.badSession:
              console.log(chalk.red.bold("Bad session file. Please delete session and scan again"));
              process.exit(1);
              break;
              
            case DisconnectReason.connectionClosed:
              console.log(chalk.yellow.bold("Connection closed, attempting to reconnect..."));
              process.exit(0);
              break;
              
            case DisconnectReason.connectionLost:
              console.log(chalk.yellow.bold("Connection lost, attempting to reconnect..."));
              process.exit(0);
              break;
              
            case DisconnectReason.connectionReplaced:
              console.log(chalk.green.bold("Connection replaced, another session opened. Please close current session."));
              sock.logout();
              break;
              
            case DisconnectReason.loggedOut:
              console.log(chalk.green.bold("Device logged out, please scan again."));
              sock.logout();
              break;
              
            case DisconnectReason.restartRequired:
              console.log(chalk.green.bold("Restart required, restarting..."));
              startConnection();
              break;
              
            case DisconnectReason.timedOut:
              console.log(chalk.green.bold("Connection timed out, attempting to reconnect..."));
              process.exit(0);
              break;
              
            default:
              if (lastDisconnect?.error == "Error: Stream Errored (unknown)") {
                console.log(chalk.red.bold("Unknown stream error, restarting..."));
                process.exit(0);
              } else {
                console.log(chalk.red.bold(`Unknown disconnect reason: ${reason}`));
                startConnection();
              }
          }
        } else if (connection === "connecting") {
          console.log(chalk.blue.bold("Connecting to WhatsApp..."));
        } else if (connection === "open") {
          console.log(chalk.green.bold("Bot successfully connected."));
        }
      });

      // Credentials update handler
      sock.ev.on("creds.update", saveCreds);

      // Contacts update handler
      sock.ev.on("contacts.update", (update) => {
        for (const contact of update) {
          const id = jidNormalizedUser(contact.id);
          if (store && store.contacts) {
            store.contacts[id] = {
              ...(store.contacts?.[id] || {}),
              ...(contact || {}),
            };
          }
        }
      });

      // Contacts upsert handler
      sock.ev.on("contacts.upsert", (update) => {
        for (const contact of update) {
          const id = jidNormalizedUser(contact.id);
          if (store && store.contacts) {
            store.contacts[id] = { ...(contact || {}), isContact: true };
          }
        }
      });

      // Groups update handler
      sock.ev.on("groups.update", (updates) => {
        for (const update of updates) {
          const id = update.id;
          if (store.groupMetadata[id]) {
            store.groupMetadata[id] = {
              ...(store.groupMetadata[id] || {}),
              ...(update || {}),
            };
          }
        }
      });

      // Group participants update handler
      sock.ev.on("group-participants.update", ({ id, participants, action }) => {
        const metadata = store.groupMetadata[id];
        if (!metadata) return;
        
        switch (action) {
          case "add":
          case "revoked_membership_requests":
            metadata.participants.push(
              ...participants.map((id) => ({
                id: jidNormalizedUser(id),
                admin: null,
              })),
            );
            break;
            
          case "demote":
          case "promote":
            for (const participant of metadata.participants) {
              const id = jidNormalizedUser(participant.id);
              if (participants.includes(id)) {
                participant.admin = action === "promote" ? "admin" : null;
              }
            }
            break;
            
          case "remove":
            metadata.participants = metadata.participants.filter(
              (p) => !participants.includes(jidNormalizedUser(p.id)),
            );
            break;
        }
      });

      // Message retrieval helper function
      async function getMessage(key) {
        if (store) {
          try {
            const msg = await store.loadMessage(key.remoteJid, key.id);
            return msg || { conversation: config.name || "ZeeBot" };
          } catch (error) {
            console.error("Error loading message:", error);
            return { conversation: config.name || "ZeeBot" };
          }
        }
        return { conversation: config.name || "ZeeBot" };
      }

      // New messages handler
      sock.ev.on("messages.upsert", async (chat) => {
        try {
          if (!chat.messages || chat.messages.length === 0) return;
          
          const chatUpdate = chat.messages[0];
          if (!chatUpdate.message) return;
          
          const userId = chatUpdate.key.id;
          global.m = await serialize(chatUpdate, sock, store);
          
          if (m.isBot) return;
          
          // Log message
          require("./lib/logger.js")(m);
          
          // Skip if self mode is enabled and sender is not owner
          if (!m.isOwner && db.list().settings?.self) return;
          
          // Process message with handler
          await require("./system/handler.js")(m, sock, store);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      });

      // Message updates handler (for polls)
      sock.ev.on("messages.update", async (chatUpdate) => {
        try {
          for (const { key, update } of chatUpdate) {
            if (update.pollUpdates && key.fromMe) {
              const pollCreation = await getMessage(key);
              if (!pollCreation) continue;
              
              const pollUpdate = await getAggregateVotesInPollMessage({
                message: pollCreation?.message,
                pollUpdates: update.pollUpdates,
              });
              
              const selectedOption = pollUpdate.filter((v) => v.voters.length !== 0)[0]?.name;
              if (!selectedOption) continue;
              
              console.log("Poll option selected:", selectedOption);
              await appendTextMessage(m, sock, selectedOption, pollCreation);
              await sock.sendMessage(m.chat, { delete: key });
            }
          }
        } catch (error) {
          console.error("Error processing message update:", error);
        }
      });

      // Set up error handling for uncaught exceptions
      process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        // Prevent crash but log the error
      });
      
      process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Prevent crash but log the error
      });

      return sock;
    } catch (error) {
      console.error("Fatal error in startConnection:", error);
      console.log(chalk.yellow.bold("Attempting to restart in 10 seconds..."));
      
      setTimeout(() => {
        startConnection();
      }, 10000);
    }
  }
  
  // Start the connection
  startConnection();
})();