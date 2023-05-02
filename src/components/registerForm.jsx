import { useState } from "react";
import Joi from "joi-browser";

import Input from "./common/input";

const RegisterForm = () => {
	const [account, setAccount] = useState({
		username: "",
		password: "",
		name: "",
	});
	const [errors, setErrors] = useState({});

	const schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	const validate = () => {
		const options = { abortEarly: false };

		const { error } = Joi.validate(account, schema, options);
		if (!error) return null;

		const errors = error.details.reduce((acc, item) => {
			acc[item.path[0]] = error.message;
			return acc;
		}, {});

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate();
		setErrors(errors || {});
		if (errors) {
			return;
		}

		console.log("Submitted");
	};

	const validateProperty = ({ name, value }) => {
		const singleProperty = { [name]: value };
		const singleScheme = { [name]: schema[name] };
		const { error } = Joi.validate(singleProperty, singleScheme);

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
			<h1>Register</h1>
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
				<Input
					name="name"
					label="Name"
					value={account.name}
					onChange={handleChange}
					error={errors.name}
					type="text"
				/>
				<button disabled={validate()} className="btn btn-primary">
					Register
				</button>
			</form>
		</>
	);
};

export default RegisterForm;
