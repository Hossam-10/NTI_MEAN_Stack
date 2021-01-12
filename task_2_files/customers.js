const fs = require('fs');
let customer = {name:"Hossam",income:5000};
let readCustomers = function(){
    let data;
    try{
        data = fs.readFileSync('customers.json');
        if( data.toString().length ==0 )
            throw new Error('error');
        data = JSON.parse(data.toString());
        if(Array.isArray(data)==false)
            throw new Error('Not Array');
    }
    catch(e){
        fs.writeFileSync('customers.json',"[]");
        data=[];
    }
    return data;
}

let showCustomers = function(){
    let data = readCustomers();
    if(data.length>0)
        console.table(data);
    else
        console.log('There are no customers');
}
let addCustomers = function(customerName,customerIncome=100){

    let data = readCustomers();
    let a = {name:customerName,income:customerIncome}
    data.push(a);
    fs.writeFileSync("customers.json",JSON.stringify(data));
}
let addIncome = function(customerName){
    let data = readCustomers();
    let customers = data.findIndex(customer=>customer.name==customerName);
    data[customers].income+=200;
    fs.writeFileSync("customers.json",JSON.stringify(data));
    console.log('Income added');

}
// showCustomers();
// addCustomers("ay7aga");
// showCustomers();
addIncome("ay7aga");

