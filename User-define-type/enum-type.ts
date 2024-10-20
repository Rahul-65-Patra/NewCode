
// enum --Store constant value ; duplicate value is not allowed here

//enum type --> numeric, string and hetergenous

//----------- Numerice enum --------------------------

// enum requestType{
//   readData=1,    // bydefault 0 thaka start hoba
//   deletedata=99,
//   saveData
// }
// console.log(requestType)


//-------------- String enum ------------------------

// enum statusType{
//   pending="Pending",
//   completed="Completed",
//   cancelled="Cancelled"
// }
// console.log(statusType);
// console.log(statusType.completed);  // two type vabha kora jai
// console.log(statusType["pending"]);  


//-------------- Hetergenous enum( combine number enum and string enum)------------------------

enum requestTypeHet{
  readData=1,    // bydefault 0 thaka start hoba
  deletedata=99,
  saveData="Hello World"
}

console.log(requestTypeHet);
