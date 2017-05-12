module.exports = (typeof document !== "undefined") ? document : require('jsdom').jsdom('<html/>');
