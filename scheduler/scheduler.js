var conn = require('../database/connectionString');
var jsonSql = require('../database/jsonSql');
var userSql = require('../database/userSql');
var helloFriendsSql = require('../database/helloFriendsSql');
var lootbox = require('../service/lootbox');
var pwyf = require('../service/pwyf');
var cron = require('node-cron');

cron.schedule('0 0 * * * *', function () {
    console.log('info', 'running a task of updating user stats every time. ' + new Date());

    // 1일 동안 업데이트 안된 대상 명단 조회
    conn.getConnection(function (err, connection) {
        connection.query(userSql.getNotUpdatedUser, function (err, rows) {

            // 에러 발생시
            if (err) {
                connection.release();
                throw err;
            }

            // 조회(LOOT_BOX_API)
            rows.forEach(function (row) {
                console.log("not updated user info" + row);
                lootbox.getUsersStats(row).then(function (response) {
                    console.log("scheduler getUsersStats: " + response);
                    pwyf.updateUserJson(row, "1", response);
                });
                lootbox.getUsersAchievements(row).then(function (response) {
                    console.log("scheduler getUsersAchievements: " + response);
                    pwyf.updateUserJson(row, "0", response);
                });
            });

            connection.release();
        });
    });
}).start();

cron.schedule('30 0 * * * *', function () {
    console.log('info', 'running a task of updating hello friends list every time. ' + new Date());
    console.log("helloFriendsSql.insertHelloFriendsList: " + helloFriendsSql.insertHelloFriendsList);

    // 1일 동안 업데이트 안된 대상 명단 조회
    conn.getConnection(function (err, connection) {
        connection.query(helloFriendsSql.insertHelloFriendsList, function (err, rows) {

            // 에러 발생시
            if (err) {
                connection.release();
                throw err;
            }

            connection.release();
            console.log("updating facebook friends list: " + rows);
        });
    });
}).start();