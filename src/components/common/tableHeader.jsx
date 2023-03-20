const TableHeader = ({ columns, sortColumn, onSort }) => {
	// move logic to avoid duplicate in parent components
	const raiseSort = (path) => {
		// create this const to check path and change order if needed
		const cloneSortColumn = { ...sortColumn };
		if (cloneSortColumn.path === path) {
			cloneSortColumn.order =
				cloneSortColumn.order === "asc" ? "desc" : "asc";
		} else {
			cloneSortColumn.path = path;
			cloneSortColumn.order = "asc";
		}
		onSort(cloneSortColumn);
	};

	const renderSortIcon = (column) => {
		if (sortColumn.path !== column.path) {
			return null;
		} else if (sortColumn.order === "asc") {
			return <i className="fa fa-sort-asc"></i>;
		} else {
			return <i className="fa fa-sort-desc"></i>;
		}
	};

	return (
		<thead>
			<tr>
				{columns.map((column) => (
					<th
						className="clickable"
						key={column.path || column.key}
						onClick={() => raiseSort(column.path)}
					>
						{column.label}
						{renderSortIcon(column)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
