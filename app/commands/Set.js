const {StringParser , ArrayParser} = require ("../parser/") ; 
const Store = require ("../Store") ; 
const replicateEvent = require("../ReplicateEvent");
const Del = require("./Del");


module.exports = class Set {
 execute(commands){
    if(commands.length<3) throw new Error ('Invalid commands') ; 

         let [_, key, value, __ , expiry] = commands;
 
         let store = new Store();
         store.data[key] = {value :value} ;
     
         if(expiry) {
           const time = new Date().getTime();
           let expiryTime = time + parseInt(expiry);
           
           store.data[key].expiry = expiryTime;
     
           setTimeout(() => {
            //  this.delete(key);
            let arrayParser = new ArrayParser();
            // Emit the event for replicas.
            replicateEvent.emit('replicate', arrayParser.serialize(['del', key]));
            const del = new Del();
            del.execute(key);
           }, parseInt(expiry));
         }
    // let store = new Store({}) ; 
    // store.data[commands[1]] = commands[2] ;
    let parser = new StringParser() ; 
    return parser.serialize("OK") ;

 }

//  delete(key) {-> bcz of del alag se hi bana diya class
//         let store = new Store();
//         delete store.data[key];
//        }
}
