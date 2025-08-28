import React, { useContext, useState, useEffect } from "react";
import NoteItem from "./NoteItem";
import ThemeContext from "../contexts/ThemeContext";
import LanguageContext, { translations } from "../contexts/LanguageContext";
import NoteItemLoading from "./NoteItemLoading";

export default function NoteList({
	title,
	notes,
	onDelete,
	onArchive,
	isLoading,
}) {
	const { theme } = useContext(ThemeContext);
	const { language } = useContext(LanguageContext);
	const [t, setT] = useState(translations[language] || translations.id);
	const cardClass =
		theme === "dark"
			? "bg-secondary bg-opacity-25 text-light"
			: "bg-light text-dark";
	useEffect(() => {
		setT(translations[language] || translations.id);
	}, [language]);
	if (isLoading) {
		return (
			<>
				<h3 className="mb-3">{title}</h3>
				<div className="row g-3">
					{Array.from({ length: 7 }).map((_, index) => (
						<div className="col-md-6 col-lg-4" key={`loading-${index}`}>
							<NoteItemLoading />
						</div>
					))}
				</div>
			</>
		);
	}
	if (!notes || notes.length === 0) {
		return <p className={`${cardClass} alert text-center`}>{t.no_notes}</p>;
	}
	return (
		<>
			<h3 className="mb-3">{title}</h3>
			<div className="row g-3">
				{notes.map((note) => (
					<div className="col-md-6 col-lg-4" key={note.id}>
						<NoteItem note={note} onDelete={onDelete} onArchive={onArchive} />
					</div>
				))}
			</div>
		</>
	);
}
