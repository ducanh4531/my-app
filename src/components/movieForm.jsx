import { useParams, useNavigate, Navigate } from "react-router-dom";
import Joi from "joi-browser";
import { useState, useEffect } from "react";

import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Routes, Route } from "react-router-dom";

import Input from "./common/input";

const MovieForm = () => {
	const { id: movieId } = useParams();
	const navigate = useNavigate();

	const [newMovie, setNewMovie] = useState({
		_id: "1",
		title: "",
		genre: { name: "" },
		numberInStock: "",
		dailyRentalRate: "",
	});
	const [genre, setGenre] = useState({ name: "", _id: "" });
	const [genres, setGenres] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const createdMovie = getMovie(movieId);
		movieId && setNewMovie(createdMovie);
	}, [movieId]);

	useEffect(() => {
		setGenres(getGenres());
	}, []);

	const schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genre: Joi.object({ name: Joi.string(), _id: Joi.string() })
			.required()
			.label("Genre"),
		numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
		dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
	};

	const validate = () => {
		const options = { abortEarly: false };

		const { error } = Joi.validate(newMovie, schema, options);
		if (!error) return null;

		const errors = error.details.reduce((acc, item) => {
			acc[item.path[0]] = item.message;
			return acc;
		}, {});
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = validate();
		setErrors(errors || {});

		if (errors) {
			return;
		}

		saveMovie(newMovie);
		navigate("/movies");
	};

	const validateProperty = ({ name, value }) => {
		const singleProperty = { [name]: value };
		const singleSchema = { [name]: schema[name] };
		const { error } = Joi.validate(singleProperty, singleSchema);

		return error ? error.details[0].message : null;
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;
		const errorsOnChange = { ...errors };
		const errorMessage = validateProperty(target);

		if (errorMessage) {
			errorsOnChange[name] = errorMessage;
		} else {
			delete errorsOnChange[name];
		}

		setNewMovie({
			...newMovie,
			genre: genre.name ? genre : newMovie.genre,
			[name]: value,
		});
		setErrors(errorsOnChange);
	};

	const handleClick = ({ target }) => {
		const { value } = target;
		const getGenre = genres.find((g) => g._id === value);
		setGenre(getGenre);
		setNewMovie({ ...newMovie, genre: getGenre });
	};

	return movieId && !newMovie ? (
		<Routes>
			<Route path="*" element={<Navigate to="/not-found" replace />} />
		</Routes>
	) : (
		<>
			<h1>Movie Form</h1>
			<form onSubmit={handleSubmit}>
				<Input
					name="title"
					label="Title"
					value={newMovie.title}
					type="text"
					onChange={handleChange}
					error={errors.title}
				/>
				<Input
					name="genre"
					label="Genre"
					value={genre.name ? genre.name : newMovie.genre.name}
					type="button"
					onClick={handleClick}
					onChange={handleChange}
					error={errors.genre}
					genres={genres}
				/>
				<Input
					name="numberInStock"
					label="Stock"
					value={newMovie.numberInStock}
					type="number"
					onChange={handleChange}
					error={errors.numberInStock}
				/>
				<Input
					name="dailyRentalRate"
					label="Rate"
					value={newMovie.dailyRentalRate}
					type="number"
					onChange={handleChange}
					error={errors.dailyRentalRate}
				/>
				<button disabled={validate()} className="btn btn-primary">
					Save
				</button>
			</form>
		</>
	);
};

export default MovieForm;
