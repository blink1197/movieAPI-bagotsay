const express = require('express');
const { addMovie, getMovies, getMovieById, updateMovie, deleteMovie, addComment, getComments } = require("../controllers/movie.controller.js");
const { verify, verifyAdmin } = require("../middleware/auth.js");


const router = express.Router();

router.get("/getMovies", verify, getMovies);
router.post("/addMovie", verify, verifyAdmin, addMovie);
router.get("/getMovie/:movieId", verify, getMovieById);
router.patch("/updateMovie/:movieId", verify, verifyAdmin, updateMovie);
router.patch("/addComment/:movieId", verify, addComment);
router.get("/getComments/:movieId", verify, getComments);
router.delete("/deleteMovie/:movieId", verify, verifyAdmin, deleteMovie);

module.exports = router;
