async function all(m) {
    const jakarta = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const current = new Date(jakarta);
    
    if (current.getHours() === 0 && current.getMinutes() === 0) {
      let list = Object.entries(db.default().user);
      list.forEach(([user, data]) => {
        data.limit = 100; //sesuaikan dengan limit yang dibutuhkan
      });
      
      console.log('Limit user berhasil direset pada', current);
    }
  }

module.exports = all