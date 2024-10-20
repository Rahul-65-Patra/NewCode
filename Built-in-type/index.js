    // Built in Data type: number, string,boolean,void, undefine, null
var userId;
var firstName;
var lastName;
var isActivated;
userId = 2211981290;
firstName = "Rahul";
lastName = "Patra";
isActivated = false;
console.log("User ID: ".concat(userId));
console.log("Full Name: ".concat(firstName, " ").concat(lastName));
console.log("User Status: ".concat(isActivated ? 'Activated' : 'Deactivated'));
console.log(firstName.split(" "));
console.log(firstName.toLocaleLowerCase());
console.log(lastName.toUpperCase());
function display() {
    console.log("Hi i am display");
}
display();
