const schedule = require('node-schedule');
const logger = require('./logger');
const $CONF = require('./config');

let j = schedule.scheduleJob($CONF.cron, () => {
    logger.debug('Start check');

    if ($CONF.db.type === 'mysql') {
        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host     : $CONF.db.host,
            user     : $CONF.db.user,
            password : $CONF.db.password,
            database : $CONF.db.database
        });
        connection.connect();
        connection.query($CONF.db.sql, (e, results, fields) => {
            if (e) {
                logger.error('Query error: ', e);
            } else {
                logger.debug('The result is: ', results[0]);
            }
            connection.end();
        });

        connection.end();
    } else if ($CONF.db.type === 'mssql') {
        const sql = require('mssql');
        sql.connect('mssql://' + $CONF.db.user+ ':' + $CONF.db.password + '@' + $CONF.db.host + '/' + $CONF.db.database).then(() => {
            sql.query($CONF.db.sql).then(result => {
                logger.debug('The result is: ', result.recordset);
                sql.close();
            }).catch(e => {
                logger.error('Query error: ', e);
                sql.close();
            });
        }).catch(e => {
            logger.error('Connection error: ', e);
        });
    } else if ($CONF.db.type === 'oracle') {
        const oracledb = require('oracledb');
        async function run() {
            let connection;
            try {
                connection = await oracledb.getConnection(  {
                    user          : $CONF.db.user,
                    password      : $CONF.db.password,
                    connectString : $CONF.db.host + "/" + $CONF.db.database
                });

                let result = await connection.execute($CONF.db.sql);
                logger.debug('The result is:', result.rows);
            } catch (e) {
                logger.error('Query error: ', e);
            } finally {
                if (connection) {
                    try {
                        await connection.close();
                    } catch (e) {
                        logger.error('Close connection error: ', e);
                    }
                }
            }
        }
        run();
    }

});
