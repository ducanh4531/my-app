import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Counter = () => {
	const [data, setData] = useState({
		count: 0,
		tags: ["tag1", "tag2", "tag3"],
	});

	const handleIncrement = () => {
		setData({ count: data.count + 1, tags: data.tags });
	};

	return (
		<>
			<h1>Hello World</h1>
			<span
				className={`badge-${
					data.count === 0 ? "warning" : "primary"
				} m-2`}
			>
				{data.count === 0 ? "Zero" : data.count}
			</span>

			<button
				className="btn btn-secondary btn-sm"
				onClick={handleIncrement}
			>
				Increment
			</button>
			<ul>
				{data.tags.map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
		</>
	);
};

export default Counter;
