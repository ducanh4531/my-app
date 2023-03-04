const Like = ({ liked, onLike }) => {
	return (
		<>
			<i
				onClick={onLike}
				className={`btn btn-default btn-sm fa fa-heart${
					liked ? "" : "-o"
				}`}
				aria-hidden="true"
				cursor="pointer"
			></i>
		</>
	);
};

export default Like;
