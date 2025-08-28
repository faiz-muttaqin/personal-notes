import React, { useState, useEffect } from "react";
import { login } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { getCookie } from "../utils/auth";

export default function LoginForm({ onLogin }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Check if user is already logged in
	useEffect(() => {
		const accessToken = getCookie("accessToken");
		if (accessToken) {
			navigate("/");
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		// Rest of your existing code
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");
		const result = await login({ email, password });
		setLoading(false);
		if (result.success) {
			setSuccess("Login success!");
			setError("");
			if (onLogin) onLogin(result.token, email);
			navigate("/");
		} else {
			setError(result.message || "Login failed");
			setSuccess("");
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100 ">
			<form
				className="bg-light bg-opacity-25 border-0 card p-4 shadow"
				style={{ minWidth: 320 }}
				onSubmit={handleSubmit}
			>
				<h3 className="mb-3 text-center">Login</h3>
				{error && <div className="alert alert-danger py-1">{error}</div>}
				{success && <div className="alert alert-success py-1">{success}</div>}
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control bg-light bg-opacity-75"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoFocus
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control bg-light bg-opacity-75"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary w-100"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				<div className="mt-3 text-center">
					<p className="mb-0">Don't have an account?</p>
					<Link type="button" to="/register" className={`btn btn-link p-0`}>
						Register here
					</Link>
				</div>
			</form>
		</div>
	);
}
