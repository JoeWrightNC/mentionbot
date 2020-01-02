const request = require('request')
const mysql = require('mysql');
const pool = mysql.createPool(process.env.JAWSDB_MARIA_URL);

const MenniecountFactory = () => (body) => new Promise((resolve, reject) => {
    var selectStatement =`SELECT COUNT(*) FROM mentions;`

    pool.query(selectStatement, function(err, rows, fields) {
        var currCount = rows[0]['COUNT(*)'];
        return resolve({
            text: `Hey There!  Since I started counting, you've saved ${currCount} press mentions!  Wow, that's a lot! `,
          })
    })

})


module.exports = MenniecountFactory