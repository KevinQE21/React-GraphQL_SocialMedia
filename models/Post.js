const { model, Schema } = require('mongoose');

//Esquema de mongo de post
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createAt: String,
        }
    ],
    likes: [
        {
        username: String,
        createAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Post', postSchema);