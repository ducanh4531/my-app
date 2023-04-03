import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
	const { id: movieId } = useParams();
	const navigate = useNavigate();

	const handleSave = () => {
		navigate("/movies");
	};

	return (
		<>
			<h1>Movie Form {movieId}</h1>
			<button className="btn btn-primary" onClick={handleSave}>
				Save
			</button>
		</>
	);
};

export default MovieForm;
