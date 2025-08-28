import React, { useState, useEffect, useCallback } from "react";
import "./styles/style.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsBoxArrowRight } from "react-icons/bs";
import { showFormattedDate } from "./utils/index";
import {
	getAllNotes,
	editNote,
	addNote,
	deleteNote,
	archiveNote,
	getNote,
	unarchiveNote,
	fetchGetAllNotes,
	fetchAddNote,
	fetchEditNote,
	fetchDeleteNote,
	fetchUnarchiveNote,
	fetchArchiveNote,
} from "./utils/notes-data-api.js";
import { getCookie, deleteCookie, getCurrentUser } from "./utils/auth.js";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
	LanguageProvider,
	LANGUAGES,
	translations,
} from "./contexts/LanguageContext";
import { LuNotebookText } from "react-icons/lu";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import NoteList from "./components/NoteList";
import Navigation from "./components/Navigation";
import NoteItemDetail from "./components/NoteItemDetail";
import PageNotFound from "./components/PageNotFound";
import ToggleTheme from "./components/ToggleTheme";
import BtnLanguage from "./components/BtnLanguage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RequireAuth from "./components/RequireAuth";
import BtnLogout from "./components/BtnLogout";

function App() {
	const [loginCookie, setLoginCookie] = useState(
		() => getCookie("accessToken") || ""
	);
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [noteItemLoading, setNoteItemLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const keywordParam = searchParams.get("search") || "";
	const [keyword, setKeyword] = useState(keywordParam);
	const [theme, setTheme] = useState(
		() => localStorage.getItem("theme") || "light"
	);
	const [language, setLanguage] = useState(
		() => localStorage.getItem("language") || "id"
	);
	const changeLanguage = useCallback((langCode) => {
		setLanguage((prevLanguage) => {
			const newLanguage =
				LANGUAGES.find((l) => l.code === langCode)?.code || "id";
			localStorage.setItem("language", newLanguage);
			return newLanguage;
		});
	}, []);
	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await getCurrentUser();
				if (user) {
					console.log("Fetched user data:", user);
					setUserName(user.data.name);
					setUserEmail(user.data.email);
				}
			} catch (error) {
				console.error("Failed to fetch user data:", error);
			}
		};

		if (loginCookie) {
			fetchUserData();
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	useEffect(() => {
		const checkCookie = () => {
			const token = getCookie("accessToken");
			if (token !== loginCookie) {
				setLoginCookie(token || "");
			}
		};

		// Check on mount
		checkCookie();

		// Set up interval to check periodically
		const interval = setInterval(checkCookie, 5000); // Check every 5 seconds

		return () => clearInterval(interval);
	}, [loginCookie]);

	const loadNotes = async () => {
		try {
			const data = await fetchGetAllNotes();
			setNotes(data);
		} catch (error) {
			console.error("Failed to load notes:", error);
			setNotes([]);
		} finally {
			setNoteItemLoading(false);
		}
	};
	useEffect(() => {
		// setNotes(getAllNotes());
		loadNotes();
	}, [loginCookie]);

	// Sync state with URL param on mount or param change
	useEffect(() => {
		if (keyword !== keywordParam) {
			setKeyword(keywordParam);
		}
	}, [keywordParam]);

	// Update URL param when keyword changes
	const handleKeywordChange = (value) => {
		setKeyword(value);
		setSearchParams(value ? { search: value } : {});
	};

	const handleAddNote = (note) => {
		addNote(note);

		const loadAddNotes = async () => {
			try {
				const data = await fetchAddNote(note);
			} catch (error) {
				console.error("Error Adding Notes:", error);
			} finally {
				loadNotes();
			}
		};
		loadAddNotes();
	};
	const handleEditNote = (note) => {
		editNote(note);
		// setNotes(getAllNotes());
		const loadEditNotes = async () => {
			try {
				const data = await fetchEditNote(note);
			} catch (error) {
				console.error("Error Editing Notes:", error);
			} finally {
				loadNotes();
			}
		};
		loadEditNotes();
	};

	const handleDeleteNote = (id) => {
		// setNotes(notes.filter((note) => note.id !== id));
		deleteNote(id);
		// setNotes(getAllNotes());
		const loadDeleteNotes = async () => {
			try {
				const data = await fetchDeleteNote(id);
			} catch (error) {
				console.error("Error Deleting Notes:", error);
			} finally {
				loadNotes();
			}
		};
		loadDeleteNotes();
	};

	const handleArchiveNote = (id) => {
		// setNotes(
		// 	notes.map((note) =>
		// 		note.id === id ? { ...note, archived: !note.archived } : note
		// 	)
		// );
		let currentNote = getNote(id);
		if (currentNote) {
			if (currentNote.archived) {
				// If currently archived, unarchive it
				unarchiveNote(id);
			} else {
				// If currently active, archive it
				archiveNote(id);
			}
			setNotes(getAllNotes());
			if (currentNote.archived) {
				// If currently archived, unarchive it
				const loadUnarchivedNotes = async () => {
					try {
						const data = await fetchUnarchiveNote(id);
					} catch (error) {
						console.error("Error Unarchiving Notes:", error);
					} finally {
						loadNotes();
					}
				};
				loadUnarchivedNotes();
			} else {
				// If currently active, archive it
				const loadArchievedNotes = async () => {
					try {
						const data = await fetchArchiveNote(id);
					} catch (error) {
						console.error("Error Archiving Notes:", error);
					} finally {
						loadNotes();
					}
				};
				loadArchievedNotes();
			}
		}
	};
	const handleLogin = async (token, email) => {
		setLoginCookie(token || "");
		setUserEmail(email || "");
	};

	const filteredNotes = notes.filter(
		(note) =>
			note.title.toLowerCase().includes(keyword.toLowerCase()) ||
			note.body.toLowerCase().includes(keyword.toLowerCase()) ||
			showFormattedDate(note.createdAt)
				.toLowerCase()
				.includes(keyword.toLowerCase())
	);

	const activeNotes = filteredNotes.filter((note) => !note.archived);
	const archivedNotes = filteredNotes.filter((note) => note.archived);

	// Bootstrap theme classes
	const themeClass =
		theme === "dark" ? "bg-dark text-light" : "bg-body-secondary text-dark";
	const t = translations[language] || translations.id;
	return (
		<LanguageProvider value={{ language, changeLanguage }}>
			<ThemeProvider value={{ theme, toggleTheme }}>
				<div className={`min-vh-100 ${themeClass}`}>
					<div className="main-container">
						<div
							className={`row align-items-center p-4 bg-primary bg-opacity-25 ${
								loginCookie ? "" : "d-none"
							}`}
						>
							<div className="col-md-6 d-flex align-items-center gap-3">
								<a className="btn btn-warning">
									<LuNotebookText />
								</a>
								<Navigation />
							</div>
							<div className="col-md-6 d-flex align-items-center justify-content-end gap-2">
								<SearchBar keyword={keyword} onChange={handleKeywordChange} />
								<BtnLanguage />
								<ToggleTheme />

								{/* Profile Dropdown */}
								<div className="dropdown">
									<button
										className="btn rounded-circle"
										type="button"
										id="profileDropdown"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<IoPersonCircleOutline />
									</button>
									<ul
										className="dropdown-menu dropdown-menu-end"
										aria-labelledby="profileDropdown"
									>
										<li className="dropdown-item-text">
											<div className="fw-bold">{userName}</div>
											<div className="text-muted small">{userEmail}</div>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li>
											<button
												className="dropdown-item text-danger"
												onClick={() => {
													deleteCookie("accessToken");
													setLoginCookie("");
												}}
											>
												<BsBoxArrowRight />
												{t.logout || "Logout"}
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<main className="p-4">
							<Routes>
								<Route
									path="/"
									element={
										<RequireAuth>
											<NoteList
												title={t.active_notes}
												notes={activeNotes}
												onDelete={handleDeleteNote}
												onArchive={handleArchiveNote}
												isLoading={noteItemLoading}
											/>
										</RequireAuth>
									}
								/>
								<Route
									path="/archived"
									element={
										<RequireAuth>
											<NoteList
												title={t.archived}
												notes={archivedNotes}
												onDelete={handleDeleteNote}
												onArchive={handleArchiveNote}
												isLoading={noteItemLoading}
											/>
										</RequireAuth>
									}
								/>
								<Route
									path="/add"
									element={
										<RequireAuth>
											<NoteForm onSave={handleAddNote} />
										</RequireAuth>
									}
								/>
								<Route
									path="/edit/:id"
									element={
										<RequireAuth>
											<NoteForm onSave={handleEditNote} />
										</RequireAuth>
									}
								/>
								<Route
									path="/register"
									element={<RegisterForm onRegister={handleLogin} />}
								/>
								<Route
									path="/login"
									element={<LoginForm onLogin={handleLogin} />}
								/>
								<Route path="/detail/:id" element={<NoteItemDetail />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</main>
					</div>
				</div>
			</ThemeProvider>
		</LanguageProvider>
	);
}
export default App;
