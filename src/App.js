// import { useState } from "react";

// import NavBar from "./components/navbar";
// import Counters from "./components/counters";
import Movies from "./components/movies";

function App() {
	// const [counters, setCounters] = useState([
	// 	{ id: 0, value: 4 },
	// 	{ id: 1, value: 0 },
	// 	{ id: 2, value: 0 },
	// 	{ id: 3, value: 0 },
	// ]);

	// const handleReset = () => {
	// 	const newCounters = counters.map((c) => ({ id: c.id, value: 0 }));

	// 	setCounters(newCounters);
	// };

	// const handleIncrement = (counter) => {
	// 	const newCounters = [...counters];
	// 	const index = newCounters.indexOf(counter);

	// 	newCounters[index] = { ...counter };
	// 	newCounters[index].value += 1;
	// 	setCounters(newCounters);
	// };

	// const handleDecrement = (counter) => {
	// 	const newCounters = [...counters];
	// 	const index = newCounters.indexOf(counter);

	// 	newCounters[index] = { ...counter };
	// 	newCounters[index].value -= 1;
	// 	setCounters(newCounters);
	// };

	// const handleDelete = (id) => {
	// 	setCounters(counters.filter((c) => c.id !== id));
	// };

	return (
		<>
			<Movies />
			{/* <NavBar
				totalCounters={counters.filter((c) => c.value > 0).length}
			/>
			<main className="container">
				<Counters
					counters={counters}
					onReset={handleReset}
					onIncrement={handleIncrement}
					onDecrement={handleDecrement}
					onDelete={handleDelete}
				/>
			</main> */}
		</>
	);
}
export default App;
