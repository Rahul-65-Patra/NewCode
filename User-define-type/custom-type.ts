


type User={name:string,id:number};


let users: User[];
users = [];


let val1:User;
val1={name:"RahulPatra",id:200};
users.push(val1);

let val2:User;
val2={name:"Patra",id:400};
users.push(val2);


console.log(users)



type RequestType = "GET " | "POST";

let getRequest: RequestType;
getRequest="GET";

function requestHandler(requestType: RequestType){
  console.log(requestType);
}
requestHandler("GET");