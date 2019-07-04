const log4js = require("log4js");
const log4js_config = require("./log.json");
log4js.configure(log4js_config);
const logger = log4js.getLogger();

module.exports = logger;
module.exports.default = module.exports;