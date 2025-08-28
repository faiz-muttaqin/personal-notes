import React, { useState, useEffect, useContext } from "react";
import { getNote } from "../utils/notes-data-api";
import { useNavigate, useParams } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import LanguageContext, { translations } from "../contexts/LanguageContext";
function NoteForm({ onSave }) {
	const { theme } = useContext(ThemeContext);
	const { language } = useContext(LanguageContext);
	const cardClass =
		theme === "dark"
			? "bg-secondary bg-opacity-25 text-light"
			: "bg-light text-dark";
	const inputClass =
		theme === "dark"
			? "form-control border-0 bg-dark bg-opacity-50 text-light border-secondary"
			: "form-control border-0 bg-secondary bg-opacity-25 text-dark border-secondary";
	const btnClass =
		theme === "dark" ? "btn btn-light w-100" : "btn btn-primary w-100";
	const titleClass = theme === "dark" ? "text-secondary" : "text-muted";
	const { id } = useParams();
	const note = getNote(id) || { id: 0, title: "", body: "" };
	const [itemId, setItemId] = useState(note.id);
	const [title, setTitle] = useState(note.title);
	const [body, setBody] = useState(note.body);
	const [t, setT] = useState(translations[language] || translations.id);

	const [charLeft, setCharLeft] = useState(
		50 - (note.title ? note.title.length : 0)
	);
	useEffect(() => {
		setItemId(note.id);
		setTitle(note.title);
		setBody(note.body);
		setCharLeft(50 - (note.title ? note.title.length : 0));
		setT(translations[language] || translations.id);
	}, [id, language]);
	const navigate = useNavigate();

	const handleTitleChange = (e) => {
		const value = e.target.value;
		if (value.length <= 50) {
			setTitle(value);
			setCharLeft(50 - value.length);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && body) {
			onSave({
				id: itemId ? itemId : +new Date(),
				title,
				body,
			});
		}
		setTitle("");
		setBody("");
		setCharLeft(50);
		navigate("/");
	};
	return (
		<form
			className={`card border-0 p-4 shadow-sm ${cardClass}`}
			onSubmit={handleSubmit}
		>
			<div className="mb-3">
				<label htmlFor="note-title" className="form-label">
					{t.title} (
					<span className={titleClass}>
						{t.remaining_character}: {charLeft}
					</span>
					)
				</label>
				<input
					id="note-title"
					type="text"
					className={inputClass}
					value={title}
					onChange={handleTitleChange}
					placeholder="Judul catatan..."
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="note-body" className="form-label">
					{t.fill}
				</label>
				<textarea
					id="note-body"
					className={inputClass}
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="Isi catatan..."
					rows={4}
					required
				/>
			</div>
			<button type="submit" className={btnClass}>
				{itemId ? "Edit" : "Tambah"} Catatan
			</button>
		</form>
	);
}

export default NoteForm;
