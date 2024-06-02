const {Echo, Ping, Command ,Set ,Get,Info , Replconf, Psync } = require('./commands/index.js');
const Replica = require("./Replica");
 const replicateEvent = require("./ReplicateEvent")
 const commandFactory = {
   "echo": Echo,
   "ping": Ping,
   "command": Command,
   "set" :Set ,
   "get" :Get ,
   "info" :Info,
   "replconf" :Replconf ,
   "psync": Psync

 }
 const writeCommands = ["set", "del"]
 module.exports = class Runner {
  //  execute(commands) {
  //    let command = commandFactory[commands[0].toLowerCase()]
  execute(commands, input, connection) {
    +     let command = commands[0].toLowerCase();
    + 
    +     // Check for a replica
    + 		if(command === 'psync') {
    + 			const replica = new Replica();
    + 			replica.addReplica(connection);
    + 		}
    +     
    +     // Check if needs to be propagated to replicas.
    +     if(writeCommands.indexOf(command) !== -1) {
    +       replicateEvent.emit('replicate', input);
    +     }
    + 
    +     command = commandFactory[command];
      if(!command) 
      throw new Error('Command Not Found')
     let commandRunner = new command();
     let result = commandRunner.execute(commands);
     return result
   }
 }
 module.exports.commandFactory = commandFactory;