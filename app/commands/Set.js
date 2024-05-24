const {StringParser} = require ("../parser/") ; 
const Store = require ("../Store") ; 


module.exports = class Set {
 execute(commands){
    if(commands.length<3) throw new Error ('Invalid commands') ; 

         let [_, key, value, __ , expiry] = commands;
 
         let store = new Store({});
         store.data[key] = value ;
     
         if(expiry) {
           const time = new Date().getTime();
           let expiryTime = time + parseInt(expiry);
           
           store.data[key].expiry = expiryTime;
     
           setTimeout(() => {
             this.delete(key);
           }, parseInt(expiry));
         }
    // let store = new Store({}) ; 
    // store.data[commands[1]] = commands[2] ;
    let parser = new StringParser() ; 
    return parser.serialize("OK") ;

 }

 delete(key) {
        let store = new Store();
        delete store.data[key];
       }
}
