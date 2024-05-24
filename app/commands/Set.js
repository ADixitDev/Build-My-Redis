const {StringParser} = require ("../parser/") ; 
const Store = require ("../Store") ; 


module.exports = class Set {
 execute(commands){
    if(commands.length<3) throw new Error ('Invalid commands') ; 

    let store = new Store({}) ; 
    store.data[commands[1]] = commands[2] ;
    let parser = new StringParser() ; 
    return parser.serialize("OK") ;

 }
}
