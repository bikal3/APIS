var User = require('../Model/user');
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
describe(' Testing of User Schema', () => {
    it(' Testing of Adding User', () => {
        const user = {
            'name': 'Bikal Shrestha',
            'email': 'bikal3.bs@gmail.com',
            'password': 'bikal'
        };

        return User.create(user)
            .then((user) => {
                expect(user.email).toEqual('bikal3.bs@gmail.com');
            });
    });
});
it('Testing of User Deletion', async() => {
    const status = await User.deleteOne({ "_id": "5d231225d4570230aeca1215" });
    expect(status.ok).toBe(1);
});
it('Testing of Updating User', async() => {
    return User.findOneAndUpdate({ "_id": "5d2318391a464d371352cbaf" }, { $set: { name: 'Raj' } })
        .then((uu) => {
            expect(uu.name).toEqual('Raj')
        })
});