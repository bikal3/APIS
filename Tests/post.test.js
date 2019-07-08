var Post = require('../Model/post');
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
        const post = {
            'title': 'Moutain View',
            'location': 'Nagarkot',
            'description': 'such a beautiful place to visit'
        };

        return Post.create(post)
            .then((post) => {
                expect(post.title).toEqual('Moutain View');
            });
    });
});
it('Testing of Contact Deletion', async() => {
    const status = await Post.deleteOne({ "_id": "5d231225d4570230aeca1215" });
    expect(status.ok).toBe(1);
});
it('Testing of Updating Contact', async() => {
    return Post.findOneAndUpdate({ "_id": "5d22bbe4f6fb3008ceffeecd" }, { $set: { title: 'Hill View' } })
        .then((p) => {
            expect(p.title).toEqual('Hill View')
        })
});