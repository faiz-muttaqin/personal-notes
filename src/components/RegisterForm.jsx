import React, { useState } from "react";
import { register } from "../utils/auth";
import { Link } from "react-router-dom";
export default function RegisterForm({ onRegister }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");
		const result = await register({ name, email, password });
		setLoading(false);
		if (result.success) {
			setSuccess("Register success! You can now login.");
			setError("");
			if (onRegister) onRegister(result.data);
		} else {
			setError(result.message || "Register failed");
			setSuccess("");
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100">
			<form
				className="card p-4 shadow bg-light bg-opacity-25 border-0"
				style={{ minWidth: 320 }}
				onSubmit={handleSubmit}
			>
				<h3 className="mb-3 text-center">Register</h3>
				{error && <div className="alert alert-danger py-1">{error}</div>}
				{success && <div className="alert alert-success py-1">{success}</div>}
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						autoFocus
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-success w-100 mb-3"
					disabled={loading}
				>
					{loading ? "Registering..." : "Register"}
				</button>
				<div className="text-center">
					<p className="mb-0">Already have an account?</p>
					<Link type="button" to="/login" className={`btn btn-link`}>
						Login here
					</Link>
				</div>
			</form>
		</div>
	);
}
