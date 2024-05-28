const net = require("net");
const Parser = require("./parser/parser.js");
 const Runner = require("./Runner.js");
 const Config = require("./Config");
const {ArrayParser} = require("./parser");
//  const config = {
//    	port: 6379
//    }
   
  //  let portIdx = process.argv.indexOf('--port')
  //  if(portIdx !== -1) 
  //  	config.port = process.argv[portIdx + 1]
  const config = new Config(process.argv);
  //console.log(config);





// CreateCOnnection will create with the help of net module tcp server on that Tcp server 
//if it is slave then slave will send to master server ping command before handshake ,

//  PING -> The PING command should be sent as a RESP Array, like this : *1\r\n$4\r\nPING\r\n
//When a replica connects to a master, it needs to go through a handshake process 
//before receiving updates from the master.

// Replconf ->The REPLCONF command is used to configure replication. Replicas will send this command to the master twice:

// The first time, it'll be sent like this: REPLCONF listening-port <PORT>
// This is the replica notifying the master of the port it's listening on
// The second time, it'll be sent like this: REPLCONF capa psync2
// This is the replica notifying the master of its capabilities ("capa" is short for "capabilities")

// psync ->The PSYNC command is used to synchronize the state of the replica with the master. The replica will send this command to the master with two arguments:

// The first argument is the replication ID of the master
// Since this is the first time the replica is connecting to the master, the replication ID will be ? (a question mark)
// The second argument is the offset of the master
// Since this is the first time the replica is connecting to the master, the offset will be -1
// So the final command sent will be PSYNC ? -1.

// This should be sent as a RESP Array, so the exact bytes will look something like this:

// *3\r\n$5\r\nPSYNC\r\n$1\r\n?\r\n$2\r\n-1\r\n
// The master will respond with a Simple string that looks like this:

//FULLRESYNC <REPL_ID> 0\r\n

if(config.replication.role==="slave"){
  console.log(`Attempting to connect to port: ${config.replication.port}`);
    
    // Check if port is a valid number
    if (typeof config.replication.port !== 'number' || isNaN(config.replication.port) || config.replication.port < 0 || config.replication.port >= 65536) {
        throw new Error(`Invalid port: ${config.replication.port}`);
    }

  const socket = net.createConnection(config.replication.port) ;
  const parser = new ArrayParser() ;
 let  at = 1 ;
  let handshake = [["ping"] , ["replconf", "listening-port", config.port] , ["replconf", "capa", "psync2"] ,["psync", "?", "-1"]]  ; 
  socket.write (parser.serialize(handshake[0])) ;

 socket.on('data' , (data)=>{
  console.log(data.toString());
 if(at<handshake.length){
  socket.write(parser.serialize(handshake[at])) ;
  at++ ; 
 }
 });
}
const server = net.createServer((connection) => {
  const parser = new Parser();
const runner = new Runner();

  // Handle connection
    connection.on("data" , (input)=>{
      const data = input.toString();
      		const commands = parser.parse(data);
       		const result = runner.execute(commands);
    connection.write(result);
    
   });
});



//port , IP Address 
 server.listen(config.port, "127.0.0.1");
