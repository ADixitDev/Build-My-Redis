const net = require("net");
const Parser = require("./parser");
 const Runner = require("./Runner.js");

const parser = new Parser();
const runner = new Runner();
// You can use print statements as follows for debugging, they'll be visible when running tests.
//console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  // Handle connection
    connection.on("data" , (input)=>{
      const data = input.toString();
      		const commands = parser.parse(data);
       		const result = runner.execute(commands);
    connection.write(result);
    
   });
});
connection.on("close", () => {
  console.log("Closing connection");
});
//port , IP Address 
 server.listen(6379, "127.0.0.1");
