import React, { useContext } from "react";
import { showFormattedDate } from '../utils/index';
import { getNote } from "../utils/notes-data-api";
import { useParams } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

export default function NoteItemDetail() {
	const { id } = useParams();
	const note = getNote(id);
	const { theme } = useContext(ThemeContext);
	const cardClass = theme === "dark" ? "bg-secondary bg-opacity-25 text-light" : "bg-light text-dark";
	if (!note) return <div className="alert alert-warning">Catatan tidak ditemukan.</div>;
	return (
		<div className={`card border-0 shadow-sm ${cardClass}`}>
			<div className="card-body">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<h3 className="card-title mb-0" translate="no">{note.title}</h3>
					<span className="badge bg-secondary">{showFormattedDate(note.createdAt)}</span>
				</div>
				<p className="card-text">{note.body}</p>
			</div>
		</div>
	);
}