const Movie = require("../models/movie.model.js")
const AppError = require("../utils/AppError.js");

module.exports.addMovie = async (req, res, next) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const movie = await Movie.create({
            title,
            director,
            year,
            description,
            genre,
            comments: []
        });

        res.status(201).json(movie);

    } catch (error) {
        next(error)
    }
};

module.exports.getMovies = async (req, res, next) => {
    try {

        const movies = await Movie.find({});

        res.status(200).json({ movies });

    } catch (error) {
        next(error)
    }

}

module.exports.getMovieById = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            throw new AppError("Movie not found", 404);
        }

        res.status(200).json(movie);

    } catch (error) {
        next(error);
    }
};

module.exports.updateMovie = async (req, res, next) => {
    try {
        const { title, director, genre, description, year } = req.body;
        const { movieId } = req.params;

        const movie = await Movie.findByIdAndUpdate(
            movieId,
            { title, director, genre, description, year },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Movie updated successfully",
            updatedMovie: movie
        });

    } catch (error) {
        next(error);
    }
}

module.exports.deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        // if (!deletedMovie) {
        //     throw new AppError("Movie not found", 404);
        // }

        res.status(200).json({
            message: "Movie deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

module.exports.addComment = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { movieId } = req.params;
        const userId = req.user.id;

        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            {
                $push: {
                    comments: {
                        userId,
                        comment: comment || ''
                    }
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            throw new AppError("Movie not found", 404);
        }

        res.status(200).json({
            message: "Comment added successfully",
            updatedMovie
        });

    } catch (error) {
        next(error);
    }
};

module.exports.getComments = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            throw new AppError("Movie not found", 404);
        }

        res.status(200).json({
            comments: movie.comments
        });

    } catch (error) {
        next(error);
    }
};