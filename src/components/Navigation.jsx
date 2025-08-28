import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArchive, FaPlus } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";
import LanguageContext,{translations} from "../contexts/LanguageContext";

function Navigation() {
	const { theme } = useContext(ThemeContext);
	const { language } = useContext(LanguageContext);
	const navLinkClass =
		theme === "dark"
			? "bg-secondary bg-opacity-25 text-light"
			: "bg-light bg-opacity-25 text-dark";
	const t = translations[language] || translations.id;
	return (
		<nav>
			<div className="btn-group" role="group" aria-label="Navigation">
				<Link
					to="/"
					className={`btn d-flex align-items-center gap-2 ${navLinkClass}`}
				>
					<FaHome /> <span>{t.dashboard}</span>
				</Link>
				<Link
					to="/archived"
					className={`btn d-flex align-items-center gap-2 ${navLinkClass}`}
				>
					<FaArchive /> <span>{t.archived}</span>
				</Link>
				<Link
					to="/add"
					className={`btn d-flex align-items-center gap-2 ${navLinkClass}`}
				>
					<FaPlus /> <span>{t.add}</span>
				</Link>
			</div>
		</nav>
		);
}

export default Navigation;
