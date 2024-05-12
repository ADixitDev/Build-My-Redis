
module.exports = class ArrayParser{

    constructor(types){
        this.types = types ;
    }
    parse( lines , at ){
      let len = parseInt(lines[at].slice(1))  ;
      let next = at+1 ; 
      let result = [] ; 


      for (let i = 0 ; i<len ; i++){
       //[lines[next][0]]let parsertype = types[lines[next][0]] ; 
       // dynamically insiates 
       // the object select the which type of parser
       // they create object
       let parser = new this.types[lines[next][0]](this.type) ; 
       let res = parser.parse(lines , next) ; 
       result.push(res.result);
       next = res.next ;
      }

      return {
        next : next ,
        result : result   
      }
    }

    serialize(){

    }
}