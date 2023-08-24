const language = require("./language.json");

const Message = (lang, file, msg) => {
  const message = language[lang][file][msg];
  return message;
};

module.exports = Message;
