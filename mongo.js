const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://dbUser:${password}@cluster0.cfqwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length < 4) {
    console.log('phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}

const name = process.argv[3]
const phoneNumber = process.argv[4]
const id = Math.floor(Math.random() * Math.floor(1000000))

const contact = new Contact({
    name: name,
    number: phoneNumber,
    id: id
})

contact.save().then(response => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
})