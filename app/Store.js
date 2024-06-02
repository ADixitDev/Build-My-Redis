module.exports = class Store {

    static instance ;
    // This is singleton pattern creates single instance what do i means 
    // if suppose set key1:value & set key1 :value2 if you check i
// demonstration 
// |
// ^
// const store1 = new Store({ key: 'value1' });
// console.log(store1.data); // Outputs: { key: 'value1' }

// const store2 = new Store({ key: 'value2' });
// console.log(store2.data); // Outputs: { key: 'value1' }

// console.log(store1 === store2); // Outputs: true


constructor(data){
    if(!Store.instance){
        Store.instance = this ;
        this.data = {}  ;    
    }
    return Store.instance ;
}

}