import { useState, useEffect } from "react";

import { getMovies, getMovie } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";

const Movies = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const rawMovies = getMovies();
		setMovies(rawMovies);
	}, []);

	const handleDelete = (id) => {
		const removeMovie = deleteMovie(id);
		setMovies(movies.filter((m) => m._id !== removeMovie._id));
	};

	const handleLike = (id) => {
		const movie = getMovie(id);
		movie.like = !movie.like;
		const updateMovie = movies.reduce((acc, cur) => {
			if (cur._id === movie.id) {
				acc.push(movie);
			}
			acc.push(cur);
			return acc;
		}, []);
		setMovies(updateMovie);
	};

	return (
		<>
			<h2>
				Showing {movies.length ? `${movies.length} movies` : "no movie"}{" "}
				in the database.
			</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th>Stock</th>
						<th>Rate</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like
									liked={movie.like}
									onLike={() => handleLike(movie._id)}
								/>
							</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleDelete(movie._id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Movies;
