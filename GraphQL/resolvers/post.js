const Post = require("../../models/Post")

//Por cada query, mutacion o suscripcion tiene su correspondiente respuesta
module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();//Si no se especifica el find, trae todo lo que se encuentre
                return posts;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}