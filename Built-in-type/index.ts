

// Built in Data type: number, string,boolean,void, undefine, null



let userId:number;
let firstName:string;
let lastName:string;
let isActivated:boolean;


userId=2211981290;
firstName="Rahul";
lastName="Patra";
isActivated=false;

console.log(`User ID: ${userId}`);

console.log(`Full Name: ${firstName} ${lastName}`);

console.log(`User Status: ${isActivated ? 'Activated' : 'Deactivated'}`);

console.log(firstName.split(" "));
console.log(firstName.toLocaleLowerCase());
console.log(lastName.toUpperCase());



function display():void{
  console.log("Hi i am display");
}
display();