const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(    // Allow access from anywhere for now
    cors({
        origin: "*",
        // origin: allowedOrigins,
        //credentials: true,
    })
);

//MongoDB database
mongoose.connect("mongodb+srv://bagotsaycg_db_user:Q4kjVikciFrKip3U@movieapp.uymp8ml.mongodb.net/movie-app-db?appName=MovieApp");

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

//Routes Middleware
const movieRoutes = require("./routes/movie.routes.js");
const userRoutes = require("./routes/user.routes.js");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

// For UptimeRobot Monitoring DO NOT DELETE
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

if (require.main === module) {
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${process.env.PORT || port}`)
    });
}

module.exports = { app, mongoose };