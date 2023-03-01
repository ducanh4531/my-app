const Counter = ({ counter, onIncrement, onDecrement, onDelete }) => {
	const styles = { fontSize: 14, fontWeight: "bold" };

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-sm">
						<span
							style={styles}
							className={`badge bg-${
								counter.value ? "primary" : "warning"
							} m-2`}
						>
							{counter.value ? counter.value : "Zero"}
						</span>
					</div>
					<div className="col-sm">
						<button
							className="btn btn-sm m-2 btn-secondary"
							onClick={() => onIncrement(counter)}
						>
							+
						</button>
						<button
							disabled={(!counter.value)}
							className="btn btn-sm m-2 btn-secondary"
							onClick={() => onDecrement(counter)}
						>
							-
						</button>
						<button
							className="btn btn-sm m-2 btn-danger"
							onClick={() => onDelete(counter.id)}
						>
							x
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Counter;
