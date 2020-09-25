const mysql = require('mysql');
const fs = require('fs');
const csv = require('csv-parser');

const randomWords = require('random-words');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu2anhto',
    database: 'dev'
});


connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});

const provinces = [];
fs.createReadStream('provinces.csv', 'utf8')
    .pipe(csv())
    .on('data', function (row) {

        const province = {
            name_translation: row.Pinyin,
            name_original: row.Name,
            parent_id: row.ParentId,
            level: row.LevelType,
            country_code: 'CN',
            zipcode: row.ZipCode,
            lat: row.Lat,
            lng: row.lng
        };
        // let id = row.ID;
        // let name_translation = row.Pinyin;
        // let name_original = row.Name;
        // let parent_id = row.ParentId;
        // let level      = row.LevelType;
        // let country_code = "CN";
        // let zipcode = row.ZipCode;
        // let lat = row.Lat;
        // let lng = row.lng;

            // let query = 'INSERT INTO provinces (id, name_translation, name_original, parent_id, level, country_code, zipcode, lat, lng) VALUES ?';
            provinces.push(province);
            
            connection.query(query, [provinces], function (err, result) {
                if (err) throw err;
                console.log("thanh cong");
            })
    })
    .on('end', function () {
        console.table(provinces);
        provinces.shift();
    });
