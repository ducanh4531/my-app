import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ pageSize, itemsCount, currentPage, onPageChange }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pagesCount + 1);

	if (pagesCount === 1) {
		return null;
	}

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className="page-item"
						style={{ cursor: "pointer" }}
					>
						<a
							className={`page-link ${
								page === currentPage ? "active" : ""
							}`}
							onClick={() => onPageChange(page)}
						>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	pageSize: PropTypes.number.isRequired,
	itemsCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
