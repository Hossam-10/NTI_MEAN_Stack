const fs = require('fs');
const yargs = require('yargs');

let readCustomers = function(){

    let data;
    try{
        data = fs.readFileSync('customers.json');
        if(data.toString().length==0)
            throw new Error('File is Empty');
        data = JSON.parse(data.toString());
        if(Array.isArray(data) == false )
            throw new Error('Not an array');
    }
    catch(e){
        fs.writeFileSync('customers.json','[]');
        data = [];
    }
    return data;
}

let addCustomer = function(accountNum,customerName,customerBalance){
    let data = readCustomers();
    let result = data.findIndex(ele=> ele.accNum==accountNum);
    if(result == -1)
    {
        let customer = {accNum:accountNum,name:customerName,balance:customerBalance};
        data.push(customer);
        fs.writeFileSync('customers.json',JSON.stringify(data));
        console.log('Adding is done!');
    }
    else
        console.log('Account number is used before');
}

let showCustomers = function(){

    let data = readCustomers();
    if(data.length==0) console.log('No customers here yet');
    console.table(data);
}

let addBalance = function(accountNum,balance){

    let data = readCustomers();
    let res = data.findIndex(ele=> ele.accNum==accountNum);
    if(res==-1)
    {
        console.log('Cannot find this account number');
        break;
    }
    console.table(data[res]);
    data[res].balance += balance;
    console.table(data[res]);
    fs.writeFileSync('customers.json',JSON.stringify(data));
}

let widthdraw = function(accountNum,amount){

    let data = readCustomers();
    let res = data.findIndex(ele=> ele.accNum==accountNum);
    if(res==-1) 
    {
    console.log('Cannot find this account number');
    }
    else
    {
    if(data[res].balance<amount)console.log('not enough money');
    else{
    data[res].balance -= amount;
    console.log(`Done! Your new balance is ${data[res].balance}`);
    fs.writeFileSync('customers.json',JSON.stringify(data));
    }
    }
}


//start of yargs
yargs.command({
    command:"addCustomer",
    builder:{
        name:{
            demandOption:true,
            type:'string'
        },
        balance:{
            demandOption:true,
            type:'number'
        },
        accountNumber:{
            demandOption:true,
            type:'number'
        }
    },
    handler: function(argv){
        addCustomer(argv.accountNumber,argv.name,argv.balance);
    }
})

yargs.command({
    command:"showAllCustomers",
    handler: function(){
        showCustomers();
    }
})

yargs.command({
    command:"addBalance",
    builder:{
        accountNumber:{
            demandOption:true,
            type:"number"
        },
        balance:{
            demandOption:true,
            typer:"number"
        }
    },
    handler: function(argv){
        addBalance(argv.accountNumber,argv.balance);
    }
})

yargs.command({
    command:'withdraw',
    builder:{
        accountNumber:{
            demandOption:true,
            type:'number',
        },
        amount:{
            demandOption:true,
            type:'number'
        }
    },
    handler: function(argv){
        widthdraw(argv.accountNumber,argv.amount);
    }
})
yargs.argv;

