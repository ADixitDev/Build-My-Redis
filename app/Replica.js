// how data will be push , i take a arr and that array i will push the data
module.exports = class Replica{
    static instance;
    constructor(connections = []){
      if(!Replica.instance){
        Replica.instance = this ; 
        this.instance = connections ;
      }

      return Replica.instance ; 
    }


    addReplica(connection){
        this.connections.push(connection) ;
        
    }
}