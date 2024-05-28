const Echo = require('./Echo');
 const Ping = require('./PING');
 const Command = require('../commands/commads.js');
 const Set = require('./Set');
 const Get = require('./Get');
 const Info = require('./info');
 const Replconf = require('./Replconf.js');
 const Psync = require ('./Psync.js');
 
 module.exports = {
   Echo, 
   Ping,
   Command,
   Set ,
   Get, 
   Info,
   Replconf,
   Psync


 }