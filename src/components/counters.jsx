import Counter from "./counter";

const Counters = ({ counters, onIncrement, onDecrement, onDelete }) => {
	return (
		<>
			<div>
				<button className="btn btn-primary btn-sm m-2">Reset</button>
			</div>
			{counters.map((counter) => (
				<Counter
					key={counter.id}
					counter={counter}
					onIncrement={onIncrement}
					onDecrement={onDecrement}
					onDelete={onDelete}
				/>
			))}
		</>
	);
};

export default Counters;
