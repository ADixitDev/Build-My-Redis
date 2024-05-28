const { randomString } = require("../util");
module.exports = class Config {
  // static methods belong to a class and don't act on its instances. 
  // This means that they can't be called on instances of the class. Instead, 
  // they're called on the class itself. 
  // They are often utility functions, such as functions to create or clone objects.

       static instance;
       constructor(config) {
         if(Config.instance) {
           return Config.instance;
         }
     
         // Defaults:
         this.port = 6379;
         this.replication = {
           'role': 'master',
           'master_replid' :randomString(40)  ,
           'master_repl_offset': 0 ,
         }
     
         this.processConfig(config);
         Config.instance = this;
         return this;
       }
     
       processConfig(args) {
        console.log('Processing config arguments:', args); 
         // Looking for given port number
         let portIdx = args.indexOf('--port')
         if(portIdx !== -1) {
           this.port = parseInt(args[portIdx + 1]);
           console.log('Configured port:', this.port);  
         }
         // Looking for replica
         let replicaIdx = args.indexOf('--replicaof')
         if(replicaIdx !== -1) {
           this.replication = args[replicaIdx + 1];
           console.log('Configured port:', this.port);
           this.replication = {
             role: 'slave',
             host: args[replicaIdx + 1],
             port: parseInt(args[replicaIdx + 2]),
           }
           console.log('Replication settings:', this.replication);
         }
       }
     }