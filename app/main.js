const net = require("net");
const Parser = require("./parser/parser.js");
 const Runner = require("./Runner.js");
 const Config = require("./Config");
//  const config = {
//    	port: 6379
//    }
   
  //  let portIdx = process.argv.indexOf('--port')
  //  if(portIdx !== -1) 
  //  	config.port = process.argv[portIdx + 1]
  const config = new Config(process.argv);
  console.log(config);


// You can use print statements as follows for debugging, they'll be visible when running tests.
//console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
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
