// let myFun: Function;
// myFun=()=>{
//   console.log("Hello World");
// }
// myFun()
var MyFunction = function (a, b) {
    console.log("Hello ".concat(a, " ").concat(b));
};
MyFunction("Rahul", 4);
function fun(a, b, c) {
    if (c === void 0) { c = "true"; }
    // console.log(c);
    // console.log(a,b);
    return a + b;
}
fun(2, 5, "false");
function bun(a, b, c) {
    return a + b;
}
console.log(bun(2, 5));
