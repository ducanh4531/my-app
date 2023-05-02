// import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import Counters from "./components/counters";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

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
			<NavBar />
			<main className="container content">
				<Routes>
					<Route
						path="/"
						exact
						element={<Navigate to="/movies" replace />}
					/>
					<Route path="register" element={<RegisterForm />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="movies" element={<Movies />} />
					<Route path="movies/new" element={<MovieForm />} />
					<Route path="movies/:id/*" element={<MovieForm />} />
					<Route path="customers" element={<Customers />} />
					<Route path="rentals" element={<Rentals />} />
					<Route path="not-found" element={<NotFound />} />
					<Route
						path="*"
						element={<Navigate to="/not-found" replace />}
					/>
				</Routes>
			</main>
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
