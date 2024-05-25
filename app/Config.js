module.exports= class Config{
    static instance ;
    constructor (config){
        if(!Config.instance){
            this.port = 6379 // it's default port 
            this.replication = {
                'role' : 'master' 
            }

            this.processConfig(config);
            Config.instance = this ;
            return this ;
        }
        return Config.instance ;
    }


    processConfig(args){
     let portIdx = args.indexof('--port');
     if(portIdx!==-1){
        this.port = parseInt(args[portIdx]) ; 
     }

     // Find out the replicas idx
     let replicasIdx = args.indexof('--replicaof');
     
     if(replicaIdx !== -1) {
               this.replication = args[replicaIdx + 1];
               this.replication = {
                 role: 'slave',
                 host: args[replicaIdx + 1],
                 port: parseInt(args[replicaIdx + 2]),
               }
             }
    
    }
}