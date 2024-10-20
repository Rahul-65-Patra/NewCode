
class user{
  // properties , methode ,constructor

   userName:string;
   age:number;

   constructor(userName: string, age: number){
     this.userName=userName;
     this.age=age;
   }
    
   display():void{
    console.log(`userName: ${this.userName}, age: ${this.age}`);
    
   }
}


// class object

// user1 - name: Rahuk Patra, age:21;
//user2 - name:Ranu Patra, age:13


let value= new user("Rahul Patra", 21);

value.display();


let value1= new user("Arya Patra", 11);

value1.display(); 

