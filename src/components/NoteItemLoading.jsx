import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function NoteItemLoading() {
	const { theme } = useContext(ThemeContext);
	const cardClass =
		theme === "dark"
			? "bg-secondary bg-opacity-25 text-light"
			: "bg-light text-dark";
	return (
		<div className={`card border-0 h-100 shadow-sm ${cardClass}`}>
			<div className="card-body d-flex flex-column">
				<div className="d-flex justify-content-between align-items-center mb-2">
						<span className="placeholder-glow w-25">
							<span
								className="placeholder rounded w-100"
								style={{ height: 24, display: "inline-block" }}
							></span>
						</span>
					<span
						className="badge rounded-pill bg-secondary placeholder-glow"
						style={{ minWidth: 80, height: 20 }}
					>
						<span
							className="placeholder rounded w-100"
							style={{ height: 1, display: "inline-block" }}
						></span>
					</span>
				</div>
				<p className="card-text flex-grow-1">
					<span className="placeholder-glow w-100">
						<span
							className="placeholder rounded w-100 mb-2"
							style={{ height: 16, display: "block" }}
						></span>
						<span
							className="placeholder rounded w-75 mb-2"
							style={{ height: 16, display: "block" }}
						></span>
						<span
							className="placeholder rounded w-50"
							style={{ height: 16, display: "block" }}
						></span>
					</span>
				</p>
				<div className="d-flex gap-2 justify-content-end mt-2">
					<button className="btn btn-sm btn-danger disabled" disabled>
						<span
							className="placeholder rounded"
							style={{ width: 20, height: 20, display: "inline-block" }}
						></span>
					</button>
					<button className="btn btn-sm btn-warning disabled" disabled>
						<span
							className="placeholder rounded"
							style={{ width: 20, height: 20, display: "inline-block" }}
						></span>
					</button>
					<button className="btn btn-sm btn-info text-white disabled" disabled>
						<span
							className="placeholder rounded"
							style={{ width: 20, height: 20, display: "inline-block" }}
						></span>
					</button>
					<button className="btn btn-sm btn-secondary disabled" disabled>
						<span
							className="placeholder rounded"
							style={{ width: 20, height: 20, display: "inline-block" }}
						></span>
					</button>
				</div>
			</div>
		</div>
	);
}
