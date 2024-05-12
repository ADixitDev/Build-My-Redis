const {StrigParser ,  BulkStringParser} = require ("../parser/") ; 

module.exports = class Echo{
    execute (commands){
     let args = "PONG" ; 
     if(commands.length > 1 ) args = commands[1] ;

     let parser = arg ? new BulkStringParser() : new StringParser();
          return parser.serialize(arg);

    }
}

