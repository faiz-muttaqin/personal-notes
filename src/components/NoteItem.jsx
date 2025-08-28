import React, { useContext } from "react";
import { showFormattedDate } from "../utils/index";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import { FaTrash, FaArchive, FaBoxOpen, FaEye, FaEdit } from "react-icons/fa";

export default function NoteItem({ note, onDelete, onArchive, onShow }) {
	const { theme } = useContext(ThemeContext);
	const cardClass =
		theme === "dark"
			? "bg-secondary bg-opacity-25 text-light"
			: "bg-light text-dark";
	const getShortTitle = (title) => {
		return title.length > 15 ? title.slice(0, 15) + "..." : title;
	};
	return (
		<div className={`card border-0 h-100 shadow-sm ${cardClass}`}>
			<div className="card-body d-flex flex-column">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<h5 className="card-title mb-0" translate="no">
						{getShortTitle(note.title)}
					</h5>
					<span className="badge rounded-pill bg-secondary">
						{showFormattedDate(note.createdAt)}
					</span>
				</div>
				<p className="card-text flex-grow-1">{note.body}</p>
				<div className="d-flex gap-2 justify-content-end mt-2">
					<button
						onClick={() => onDelete(note.id)}
						className="btn btn-sm btn-danger"
						title="Hapus"
					>
						<FaTrash />
					</button>
					<button
						onClick={() => onArchive(note.id)}
						className="btn btn-sm btn-warning"
						title="Arsipkan/Kembalikan"
					>
						{note.archived ? <FaBoxOpen /> : <FaArchive />}
					</button>
					<Link
						to={`/detail/${note.id}`}
						className="btn btn-sm btn-info text-white"
						title="Detail"
					>
						<FaEye />
					</Link>
					<Link
						to={`/edit/${note.id}`}
						className="btn btn-sm btn-secondary"
						title="Edit"
					>
						<FaEdit />
					</Link>
				</div>
			</div>
		</div>
	);
}
