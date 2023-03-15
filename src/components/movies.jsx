/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Like from "./common/like";
import Pagination from "./common/pagination";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [pageSize] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("");

	useEffect(() => {
		const rawMovies = getMovies();
		setMovies(rawMovies);
	}, []);

	useEffect(() => {
		const rawGenres = [{ name: "All Genres" }, ...getGenres()];
		setGenres(rawGenres);
	}, []);

	const handleDelete = (id) => {
		const removeMovie = deleteMovie(id);
		setMovies(movies.filter((m) => m._id !== removeMovie._id));
	};

	const handleLike = (movie) => {
		const newMovies = [...movies];
		const index = movies.indexOf(movie);

		newMovies[index] = { ...newMovies[index] };
		newMovies[index].like = !newMovies[index].like;
		setMovies(newMovies);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleGenreSelect = (genre) => {
		setSelectedGenre(genre);
		setCurrentPage(1);
	};

	const filtered =
		selectedGenre && selectedGenre._id
			? movies.filter((m) => m.genre._id === selectedGenre._id)
			: movies;

	const { length: count } = movies;
	const allMovies = paginate(filtered, currentPage, pageSize);

	return (
		<div className="row">
			{/* to change column width: e.g: col-2,3,4 */}
			<div className="col-2">
				<ListGroup
					items={genres}
					onItemSelect={handleGenreSelect}
					selectedItem={selectedGenre}
				/>
			</div>
			<div className="col">
				<h2>
					Showing{" "}
					{filtered.length ? `${filtered.length} movies` : "no movie"}{" "}
					in the database.
				</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{allMovies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.like}
										onLike={() => handleLike(movie)}
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
				<Pagination
					pageSize={pageSize}
					itemsCount={filtered.length}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Movies;
