const {StringParser}  = require ("../parser") 
const Config = require("../Config");
module.exports = class Psync{
    execute (commands){
        let section ;
        if(commands.length >1){
            section = commands[1] ;
            let parser = new StringParser() ; 
           //return parser.serialize("FULLRESYNC <REPL_ID> 0");
           const config = new Config();
    return parser.serialize(`FULLRESYNC ${config.replication.master_replid} 0`);

        }
    }
}