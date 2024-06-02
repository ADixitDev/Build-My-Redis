const Store = require("../Store");
const { StringParser } = require("../parser/");

module.exports = class Del { 
  execute(commands) {
    // Error handling for insufficient arguments
    let [_, key] = commands;
    let store = new Store();
    delete store.data[key];
    let parser = new StringParser();
    return parser.serialize("OK");
  }
}