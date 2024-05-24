const {StringParser , BulkStringParser , ArrayParser} = require ('../parser/index.js') ;  
const RESPTypes = {
     	'*': ArrayParser,
    	'+': StringParser,
     	'$': BulkStringParser,
     };
module.exports =  class parser {
    parse(data){
      if (data[0]!== '*') throw new Error('Invalid string received')

      const lines = data.split('\r\n') ;
      lines.pop();	
      let type = lines[0][0] ;
      //if(RESPTypes[type] === undefined) throw new Error('Unknown Type');
     // *3\r\n:1\r\n:2\r\n:3\r\n
     // (*2$5\r\ndata\r\n) so this gives me [0] -> *2 ,second[0]->* means  ArraParser 
    // dynamically created object 
      let parser = new RESPTypes[type](RESPTypes) ; 
      let {result} = parser.parse(lines , 0) ; 
      return result ;   
    }
    //           0.*3\r\n || 1. :1\r\n|| 2. :2\r\n|| 3.:3\r\n

    serialize(){
        
    }
}
