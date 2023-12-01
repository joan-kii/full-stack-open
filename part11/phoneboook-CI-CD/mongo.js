const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password argument: ');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://joansb81:${password}@phonebook.q3sdxnq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({})
    .then((people) => {
      people.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`Added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Please give password, name and number to add a new person');
  process.exit(1);
}
