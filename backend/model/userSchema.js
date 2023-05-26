const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const {blogSchema ,Blog} = require('./blogSchema');
const {commentSchema} = require("./commentSchema");

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    blogs: [blogSchema],
    comments: [commentSchema],
    likedBlogs: [], 
    tokens: [
        {
            token: {
               type: String,
               required:true 
            }
        }
    ]
})


// we are hashing the password  
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


// collection creation 
const User = mongooose.model('USER', userSchema);

module.exports = User;

