
// let myFun: Function;


// myFun=()=>{
//   console.log("Hello World");
// }
// myFun()


const MyFunction=(a:string,b:number)=>{
  console.log(`Hello ${a} ${b}`);
}
MyFunction("Rahul",4);


function fun(a:number, b:number, c:string = "true"){

  // console.log(c);
  // console.log(a,b);
  return a+b;
  
}
fun(2,5,"false");

function bun(a:number, b:number, c?:string){


  return a+b;
  
}
console.log(bun(2,5));



