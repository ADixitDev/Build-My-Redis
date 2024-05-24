const {BulkStringParser} = require ("../parser/") ; 
const Store = require ("../Store") ; 


module.exports = class Get {
 execute(commands){
    if(commands.length<2) throw new Error ('Invalid commands') ; 

   // let store = new Store({}) ; 

    // if(store.data[commands[1]] === undefined) {
    //     return new BulkStringParser().serialize(null);
    //  }
    let store = new Store();
         let key = commands[1];
         
         // If the key is not present or,
         // If the key is invalid now and hasn't been deleted yet.
         if(store.data[key] === undefined || (store.data[key].expiry && store.data[key].expiry <= new Date().getTime())) {
            return new BulkStringParser().serialize(null);
          }

    let parser = new BulkStringParser() ; 
    return parser.serialize(store.data[commands[1].value]) ;

 }
}
