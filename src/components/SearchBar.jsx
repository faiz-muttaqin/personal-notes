
import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function SearchBar({ keyword, onChange }) {
	const { theme } = useContext(ThemeContext);
	const inputClass = theme === "dark" ? "form-control border-0 bg-secondary bg-opacity-25 text-light border-secondary" : "form-control border-0 bg-light text-dark border-secondary";
	return (
		<div className="input-group">
			<input
				className={inputClass}
				type="text"
				placeholder="Cari catatan..."
				value={keyword}
				onChange={(e) => onChange(e.target.value)}
				autoComplete="off"
				aria-label="Cari catatan"
			/>
		</div>
	);
}
