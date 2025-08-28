import  {apiFetch} from "./auth.js";
let notes = [];

async function fetchGetAllNotes() {
  try {
    const [regularNotesResponse, archivedNotesResponse] = await Promise.all([
      apiFetch("/notes"),
      apiFetch("/notes/archived"),
    ]);
    // Extract only the data array from each response
    const regularNotes = regularNotesResponse.data || [];
    const archivedNotes = archivedNotesResponse.data || [];
    // Return combined notes array directly
    notes = [...regularNotes, ...archivedNotes]
    return notes;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
}
async function fetchAddNote({ title, body }) {
	try {
		const response = await apiFetch("/notes", {
			method: "POST",
			body: JSON.stringify({
				title: title || "(untitled)",
				body,
			}),
		});

		return response.data;
	} catch (error) {
		console.error("Failed to create note:", error);
		return null;
	}
}
async function fetchDeleteNote(id) {
	try {
		await apiFetch(`/notes/${id}`, {
			method: "DELETE",
		});
		return true;
	} catch (error) {
		console.error(`Failed to delete note ${id}:`, error);
		return false;
	}
}
async function fetchEditNote({ id, title, body }) {
  try {
    await fetchDeleteNote(id);
    try {
      await fetchAddNote({
        id,
        title: title || "(untitled)",
        body,
      });
      return note;
    } catch (error) {
      console.error(`Failed to unarchive note ${id}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Failed to unarchive note ${id}:`, error);
    return null;
  }
}

async function fetchArchiveNote(id) {
	try {
		await apiFetch(`/notes/${id}/archive`, {
			method: "POST",
		});
		return true;
	} catch (error) {
		console.error(`Failed to archive note ${id}:`, error);
		return false;
	}
}

async function fetchUnarchiveNote(id) {
	try {
		await apiFetch(`/notes/${id}/unarchive`, {
			method: "POST",
		});
		return true;
	} catch (error) {
		console.error(`Failed to unarchive note ${id}:`, error);
		return false;
	}
}
function getAllNotes() {
  return notes;
}

function getNote(id) {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
}

function getActiveNotes() {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

function getArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

function addNote({ title, body }) {
  notes = [...notes, {
    id: `notes-${+new Date()}`, title: title || '(untitled)', body, createdAt: new Date().toISOString(), archived: false,
  }];
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
}

function archiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
}

function unarchiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
}

function editNote({ id, title, body }) {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title;
  noteToEdit.body = body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
}

export {
  fetchGetAllNotes,
  fetchAddNote,
  fetchEditNote,
  fetchDeleteNote,
  fetchArchiveNote,
  fetchUnarchiveNote,
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
};
