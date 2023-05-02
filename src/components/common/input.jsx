const Input = ({ name, label, error, genres, value, ...rest }) => {
	if (name === "genre") {
		return (
			<div className="dropdown mb-3">
				{label}
				<button
					className="btn btn-outline-secondary dropdown-toggle form-control"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{value}
				</button>
				<ul className="dropdown-menu form-control">
					{genres.map((g) => (
						<li key={g._id}>
							<button
								name={name}
								value={g._id}
								{...rest}
								className="dropdown-item"
							>
								{g.name}
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<input
				{...rest}
				autoFocus={name === "username" && true}
				autoComplete={name === "password" ? "true" : "false"}
				name={name}
				value={value}
				id={name}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
