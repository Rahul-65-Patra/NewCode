//let users:object[];   //users called array of object
//users=[{name:"Rahul Patra"},{name:"Biplab"}]
// let user1:{name:string, userId?:number}       // ? ----> its means ? it is a optional
//  user1={name:"Rahul"}
// console.log(user1);
var users;
users = [];
var user1;
user1 = { userName: "Rahul Patra", userId: 100 };
users.push(user1);
var user2;
user2 = { userName: "Ranu Patra", userId: 200 };
console.log(users);
for (var key in users) {
    console.log(key); // only print in array index number
    console.log(users[key]);
    console.log(users[key]["userName"]);
}
console.log(users);
// let obj1:{
//   userName:string,
//   userId:100,
// }
//  obj1={
//   userName:"Rahul Patra",
//   userId:100,
// }
// console.log(obj1.userName)
