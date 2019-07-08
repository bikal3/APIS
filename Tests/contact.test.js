var Contact = require('../Model/contact');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/travelnepalapi';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});
describe(' Testing of Contact Schema', () => {
    it(' Testing of Adding Contact', () => {
        const contact = {
            'fname': 'Bikal',
            'lname': 'Shrestha',
            'email': 'bikal3@gmail.com'
        };

        return Contact.create(contact)
            .then((contact) => {
                expect(contact.email).toEqual('bikal3@gmail.com');
            });
    });
});
it('Testing of Contact Deletion', async() => {
    const status = await Contact.deleteOne({ "_id": "5d231643739ccd34c704ca3a" });
    expect(status.ok).toBe(1);
});
it('Testing of Updating Contact', async() => {
    return Contact.findOneAndUpdate({ "_id": "5d2313a944bf8c3270870789" }, { $set: { fname: 'Raj' } })
        .then((pp) => {
            expect(pp.fname).toEqual('Raj')
        })
});