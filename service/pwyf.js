var conn = require('../database/connectionString');
var jsonSql = require('../database/jsonSql');
var userSql = require('../database/userSql');

exports.updateUserJson = function (row, type, response) {
    console.log("db insert string. row: " + row + " response: " + response);
    // 대상 명단 조회(PWYF)
    conn.getConnection(function (err, connection) {
        connection.query("UPDATE json SET json = ?, mod_date = NOW() WHERE seq = ? AND type = ?", [response, row.jsonSeq, type], function (err, rows) {
            // 에러 발생시
            if (err) {
                connection.release();
                throw err;
            }

            connection.release();
            console.log("update success");
        });
    });
}

exports.updateUserJsonWithRegionAndPlatform = function (row, type, response) {
    console.log("db insert string. row: " + row + " response: " + response);
    // 대상 명단 조회(PWYF)
    conn.getConnection(function (err, connection) {
        connection.query("UPDATE json SET json = ?, mod_date = NOW() WHERE seq = ? AND type = ?", [response, row.jsonSeq, type], function (err, rows) {
            // 에러 발생시
            if (err) {
                connection.release();
                throw err;
            }

            connection.release();
            console.log("update success");
        });
    });
}

exports.getRegionInfo = function (seq, callback) {

    conn.getConnection(function (err, connection) {
        connection.query("SELECT * from region where seq = ?", [seq], function (err, rows) {
            // 에러 발생시
            if (err) {
                connection.release();
                callback(err, null);
            }

            connection.release();
            callback(null, rows[0]);
        });
    });
}

exports.getPlatformInfo = function (seq, callback) {

    conn.getConnection(function (err, connection) {
        connection.query("SELECT * from platform where seq = ?", [seq], function (err, rows) {
            // 에러 발생시
            if (err) {
                connection.release();
                callback(err, null);
            }

            connection.release();
            callback(null, rows[0]);
        });
    });
}