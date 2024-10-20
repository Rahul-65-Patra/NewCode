
var userId:(string | number | boolean);    // | ---> is called union


userId:"Rahul";
userId:258;
userId:true;


function displayUserInfo(userId:string | number){
  console.log(`User ID: ${userId}`);
}
displayUserInfo("100");
displayUserInfo(100)


