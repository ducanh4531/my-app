/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ totalCounters }) => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<Link className="navbar-brand clickable" to="/">
					Vidly
					{/*  */}
					{/* total Counters app */}
					{/* <span className="badge rounded-pill text-bg-secondary"> */}
					{/* {totalCounters} */}
					{/* </span> */}
					{/*  */}
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								className="nav-link clickable"
								aria-current="page"
								to="/movies"
							>
								Movies
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link clickable"
								to="/customers"
							>
								Customers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link clickable"
								to="/rentals"
							>
								Rentals
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link clickable" to="/login">
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link clickable"
								to="/register"
							>
								Register
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
