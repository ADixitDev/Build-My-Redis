const Echo = require('./Echo');
 const Ping = require('./PING');
 const Command = require('../commands/commads.js');
 const Set = require('./Set');
 const Get = require('./Get');
 const Info = require('./info');
 const Replconf = require('./Replconf.js');
 const Psync = require ('./Psync.js');
 const Del = require('./Del');
 
 module.exports = {
   Echo, 
   Ping,
   Command,
   Set ,
   Get, 
   Info,
   Replconf,
   Psync, 
   Del


 }