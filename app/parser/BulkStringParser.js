module.exports = class BulkStringParser {
       parse(lines, at) {
         return {
           next: at + 2, 
           result: lines[at + 1]
         }
       }
     
       serialize(str) {
        if (str === null) {
          return `$-1\r\n`;
        }
    
         return `$${str.length}\r\n${str}\r\n`;
       }
     }