const ListGroup = ({
	items,
	onItemSelect,
	selectedItem,
	textProperty,
	valueProperty,
}) => {
	return (
		<>
			<ul className="list-group">
				{items.map((item) => (
					<li
						style={{ cursor: "pointer" }}
						onClick={() => onItemSelect(item)}
						key={item[valueProperty]}
						className={`list-group-item ${
							selectedItem === item ? "active" : ""
						}`}
					>
						{item[textProperty]}
					</li>
				))}
			</ul>
		</>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
