const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
            trim: true
        },
    }
);

// Main movie schema
const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        director: {
            type: String,
        },
        year: {
            type: Number,
        },
        description: {
            type: String
        },
        genre: {
            type: String,
        },
        comments: {
            type: [commentSchema],
            default: []
        }
    },
    {
        collection: 'movies'

    }
);

module.exports = mongoose.model("Movie", movieSchema);
