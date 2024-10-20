var users;
users = [];
var val1;
val1 = { name: "RahulPatra", id: 200 };
users.push(val1);
var val2;
val2 = { name: "Patra", id: 400 };
users.push(val2);
console.log(users);
var getRequest;
getRequest = "GET";
function requestHandler(requestType) {
    console.log(requestType);
}
requestHandler("GET");
