const NavBar = ({ totalCounters }) => {
	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<a className="navbar-brand" href="#s">
					Navbar{" "}
					<span className="badge rounded-pill text-bg-secondary">
						{totalCounters}
					</span>
				</a>
			</nav>
		</div>
	);
};

export default NavBar;
