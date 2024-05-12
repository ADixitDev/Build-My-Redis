const {StringParser , BulkStringParser , ArrayParser} = require ('./parser') ;  
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
      if(RESPTypes[type] === undefined) throw new Error('Unknown Type');

      let types = lines[0][0] // (*2$5\r\ndata\r\n) so this gives me [0] -> *2 ,second[0]->* means  ArraParser 
    // dynamically created object 
      let parser = new RESPTypes[types](RESPTypes) ; 
      let {result} = parser.parse(lines , 0) ; 
      return result ;   
    }

    serialize(){
        
    }
}
