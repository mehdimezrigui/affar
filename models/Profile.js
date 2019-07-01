const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    annonce: [
        {
            title: {type: String,
                    required: true},
            descrition: {type: String,
                    required: true},
            prix: {type: String,
                    required: true},
            condition: {type: String,
                    required: true},
            etatOffre: {type: String,
                    required: true},
            image: {type: String,
                    required: true},
        }
    ]
        
});
module.exports = Profile = mongoose.model('profiles', ProfileSchema);