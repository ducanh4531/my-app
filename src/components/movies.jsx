import { useState, useEffect } from "react";

import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import Pagination from "./common/pagination";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [pageSize] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const rawMovies = getMovies();
		setMovies(rawMovies);
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

	const { length: count } = movies;
	const allMovies = paginate(movies, currentPage, pageSize);

	return (
		<>
			<h2>
				Showing {count ? `${count} movies` : "no movie"} in the
				database.
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
				itemsCount={count}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</>
	);
};

export default Movies;
