const {BulkStringParser} = require ("../parser/") ; 
const Store = require ("../Store") ; 


module.exports = class Get {
 execute(commands){
    if(commands.length<2) throw new Error ('Invalid commands') ; 

    let store = new Store({}) ; 

    if(store.data[commands[1]] === undefined) {
        return new BulkStringParser().serialize(null);
     }

    let parser = new BulkStringParser() ; 
    return parser.serialize(store.data[commands[1]]) ;

 }
}
