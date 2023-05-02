import { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [pageSize] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("");
	const [sortColumn, setSortColumn] = useState({
		path: "title",
		order: "asc",
	});

	useEffect(() => {
		const rawMovies = getMovies();
		setMovies(rawMovies);
	}, []);

	useEffect(() => {
		const rawGenres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	// encapsulated the logic into a function:
	const getPagedData = () => {
		const filtered =
			selectedGenre && selectedGenre._id
				? movies.filter((m) => m.genre._id === selectedGenre._id)
				: movies;

		// use lodash to order filtered list by using specific path of objects in array and order asc or desc
		const sorted = _.orderBy(
			filtered,
			[sortColumn.path],
			[sortColumn.order]
		);

		// no need the code below, the constant allMovies replaced it
		// const { length: count } = movies;
		const allMovies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: allMovies };
	};

	const { totalCount, data: allMovies } = getPagedData();

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
				{/* <button className="btn btn-primary" onCreate={handleCreate}> */}
				<Link to="/movies/new">
					<button className="btn btn-primary">New Movie</button>
				</Link>
				<p>
					Showing {totalCount ? `${totalCount} movies` : "no movie"}{" "}
					in the database.
				</p>
				<MoviesTable
					allMovies={allMovies}
					sortColumn={sortColumn}
					onLike={handleLike}
					onDelete={handleDelete}
					onSort={handleSort}
				/>
				<Pagination
					pageSize={pageSize}
					itemsCount={totalCount}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Movies;
