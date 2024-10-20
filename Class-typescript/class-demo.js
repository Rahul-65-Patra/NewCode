var user = /** @class */ (function () {
    function user(userName, age) {
        this.userName = userName;
        this.age = age;
    }
    user.prototype.display = function () {
        console.log("userName: ".concat(this.userName, ", age: ").concat(this.age));
    };
    return user;
}());
// class object
// user1 - name: Rahuk Patra, age:21;
//user2 - name:Ranu Patra, age:13
var value = new user("Rahul Patra", 21);
value.display();
var value1 = new user("Arya Patra", 11);
value1.display();
