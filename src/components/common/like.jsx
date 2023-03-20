const Like = ({ liked, onLike }) => {
	return (
		<>
			<i
				onClick={onLike}
				className={`clickable btn btn-default btn-sm fa fa-heart${
					liked ? "" : "-o"
				}`}
				aria-hidden="true"
			></i>
		</>
	);
};

export default Like;
