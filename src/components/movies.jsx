import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";

const Movies = () => {
	const [movies, setMovies] = useState(getMovies());

	const handleDelete = (id) => {
		const removeMovie = deleteMovie(id);
		setMovies(movies.filter((m) => m._id !== removeMovie._id));
	};

	return (
		<>
			<h1>
				Showing {movies.length ? `${movies.length} movies` : "no movie"}{" "}
				in the database.
			</h1>

			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th>Stock</th>
						<th>Rate</th>
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
								<button onClick={() => handleDelete(movie._id)}>
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
