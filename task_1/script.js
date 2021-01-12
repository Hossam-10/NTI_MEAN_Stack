let showHide = document.getElementById("showHide");
let userForm = document.getElementById("userForm");
let userTable = document.getElementById("tableBody");
let keys = ['name','age','email','address','office'];

let users = JSON.parse(localStorage.getItem('users')) || [];

showHide.addEventListener("click" , function(){

    this.textContent=="Show"? this.textContent="Hide":this.textContent="Show";
    document.getElementById("formDiv").classList.toggle("d-none");
})

userForm.addEventListener("submit",function(e){

    e.preventDefault();
    let data = this.elements;
    let user = {};
    keys.forEach(key=>{
        if(key!='office')
            user[key]= data[key].value;
        else
        user[key]= data[key].checked; 
    })
    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));
    // userForm.reset();
    showSingle(user,users.length-1);
})

let deleteUser = function(btn,index){
    btn.addEventListener("click",function(){
        users.splice(index,1);
        localStorage.setItem('users',JSON.stringify(users));
        showUsers();
    })
}
let updateUser = function(btn,index){
    btn.addEventListener("click",function(){
        users[index].office = !users[index].office;
        localStorage.setItem('users',JSON.stringify(users));
        showUsers();
    })
}
let addElement = function(elementType,txt,parent,index,classL=[]){
    let element = document.createElement(elementType)
    element.textContent = txt;
    classL.forEach(c=> {element.classList.add(c)});
    if(elementType=="button" && element.textContent=="Delete") 
        deleteUser(element,index);
    if(elementType=="button" && element.textContent=="Update")
        updateUser(element,index);
    parent.appendChild(element);
}

let showSingle = function(user,index){

        let tr = document.createElement('tr');
        addElement('td',index+1,tr,index);

        keys.forEach(key=>{
            addElement('td',user[key],tr,index);
        })
        addElement('button',"Delete",tr,index,['btn','btn-danger','m-2']);
        addElement('button',"Update",tr,index,['btn','btn-info']);
        
        userTable.appendChild(tr);
}
let showUsers = function(){

    userTable.innerHTML = "";
    users.forEach((user,index)=>{
        showSingle(user,index);
    })
}
showUsers();
