import { useState } from "react";
import Joi from "joi-browser";

import Input from "./common/input";

const LoginForm = () => {
	// should set value of properties to empty string or value from server when doing with form
	const [account, setAccount] = useState({ username: "", password: "" });
	const [errors, setErrors] = useState({});

	const schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	const validate = () => {
		const options = { abortEarly: false };
		// validate properties of obj and schema obj
		const { error } = Joi.validate(account, schema, options);
		if (!error) return null;

		const errors = error.details.reduce((acc, item) => {
			acc[item.path[0]] = item.message;
			return acc;
		}, {});

		return errors;
	};

	const handleSubmit = (e) => {
		// prevent the default behavior of this event
		// and we will don't have any extra requests in network tab
		e.preventDefault();

		const errors = validate();
		setErrors(errors || {});
		if (errors) {
			return;
		}

		// then, call the server to save the changes and redirect users to other pages
		console.log("Submitted");
	};

	const validateProperty = ({ name, value }) => {
		const singleProperty = { [name]: value };
		const singleSchema = { [name]: schema[name] };
		const { error } = Joi.validate(singleProperty, singleSchema);

		return error ? error.details[0].message : null;
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;
		const errorsOnChange = { ...errors };
		const errorMessage = validateProperty(target);

		if (errorMessage) {
			errorsOnChange[name] = errorMessage;
		} else {
			delete errorsOnChange[name];
		}

		setAccount({ ...account, [name]: value });
		setErrors(errorsOnChange);
	};

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<Input
					name="username"
					label="Username"
					value={account.username}
					onChange={handleChange}
					error={errors.username}
					type="text"
				/>
				<Input
					name="password"
					label="Password"
					value={account.password}
					onChange={handleChange}
					error={errors.password}
					type="password"
				/>
				{/* <button disabled={validate()} className="btn btn-primary"> */}
				{/* Login */}
				<button className="btn btn-primary">Login</button>
			</form>
		</>
	);
};

export default LoginForm;
