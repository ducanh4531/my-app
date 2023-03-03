import { useState } from "react";

const Like = () => {
	const [like, setLike] = useState(0);

	const handleLike = () => {
		setLike(!like);
	};
	
	return (
		<>
			<i
				onClick={handleLike}
				className={`btn btn-default btn-sm fa fa-heart${
					like ? "" : "-o"
				}`}
				aria-hidden="true"
				cursor="pointer"
			></i>
		</>
	);
};

export default Like;
