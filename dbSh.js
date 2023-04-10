//Import the mongoose module
const mongoose = require("mongoose");

//Import the shema person
const Person = require("./person");



//Installing and setting up Mongoose
MONGO_URI ="mongodb+srv://mounira:1234@cluster0.e9ov5qg.mongodb.net/?retryWrites=true&w=majority";
//*****Bind connection to error event (to get notification of connection errors)
main().catch(err => console.log(err));
async function main() {
   mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
   console.log ("successfully connected")
}


//Create a document instance
const person = new Person({
    name: "Jad",
    age: 36,
    favoriteFoods: ["Spaghetti", "Hamburger", "Tacos"], });

//Save a Record of a Model

 person.save(function (err, data) {
 if (err) return console.log(err);
    //returned document instance in the callback
  else {console.log(data);}});


 //Create Many Records with model.create()
 const arrayOfPeople = [
    {name:"Caroline", age: 30,favoriteFoods: ["Pizza"   ] },
    {name:"Marck", age: 29,favoriteFoods: ["Panini"] },
    {name:"Franck", age: 28,favoriteFoods: ["chapati","mlawi"] },
    {name:"Sami", age: 28,favoriteFoods: ["chapati","mlawi"] } ,
    {name:"Fouad", age: 35,favoriteFoods: ["Pizza" ]},
];
//saves them all in the DB
//returned document instance in the callback


 // Person.create(arrayOfPeople).then((data) => {console.log(data);});

//Find all the people having a given name "jad"
  Person.find( {name :"Jad"})
  .then((data) => {console.log(data);})

  //Find just one person which has a certain food "taco"
  
  Person.findOne({ favoriteFoods:'Panini'})
  .then((data) => {console.log(data);})



  
  //Search Database By _id
  var _id = "62fed63ef8d242f10f44685d";
  Person.findById(_id, function (err, data) {
    if (err){console.log(err.message); }
    else{ 
        //person.save(data);
        console.log(data);}
});

//find a person by _id Add "hamburger" to the list of the person's
   Person.findOneAndUpdate(
    {  _id: "62fed63ef8d242f10f44685d"  },
    { $push: { favoriteFoods: "hamburger"} },
  ).exec();


//model.findOneAndUpdate()
Person.findOneAndUpdate({ name: "Jad" }, { age: 20 }, { new: true })
.then((data) => {console.log(data); });

//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove({ _id: "62fec923e35944fb178dae56" })
.then((data) => {console.log(data); });

//Delete Many Documents with model.remove()
Person.remove({ name: "Jad" })
.then((data) => {console.log(data); });

//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "mlawi"} ,{age:0}).sort({ name: 1 }).limit(1)
.exec((err, data) => {
 if (err) {console.log(err.message);}
 else{console.log(data);}
});

