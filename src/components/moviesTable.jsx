import { Link } from "react-router-dom";

import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({ allMovies, sortColumn, onLike, onDelete, onSort }) => {
	const columns = [
		{
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`} className="link">
					{movie.title}
				</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "like",
			content: (movie) => (
				<Like liked={movie.like} onLike={() => onLike(movie)} />
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<button
					className="btn btn-danger btn-sm"
					onClick={() => onDelete(movie._id)}
				>
					Delete
				</button>
			),
		},
	];
	return (
		<Table
			columns={columns}
			sortColumn={sortColumn}
			onSort={onSort}
			data={allMovies}
		/>
	);
};

export default MoviesTable;
