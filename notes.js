const fs = require('fs');

const chalkHandler = require('./chalkHandler');

/**
 * Adds new note to file
 * 
 * @param {Note} newNote 
 */
const addNote = (newNote) => {
    getNote(newNote.title) ?
        chalkHandler.printMsg('error', 'Note already exists!') :
        saveNote(newNote);
};

/**
 * Loads notes object from file
 * 
 * @returns object Note[]
 */
const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('./json/notes.json').toString());
    } catch (e) {
        return [];
    }
};

/**
 * Get note by title
 * 
 * @param {string} title
 * @returns {object} Note
 */
const getNote = (title) => {
    try {
        return loadNotes().find((note) => note.title === title)
    } catch (e) {
        return {};
    }
}

/**
 * Removes all notes
 */
const removeAll = () => fs.writeFileSync('./json/notes.json', '');

/**
 * Removes note from file
 * 
 * @param {string} title 
 */
const removeNote = (title) => {
    const newNotes = loadNotes().filter((note) => note.title !== title);

    if (getNote(title)) {
        saveNotes(newNotes);
        chalkHandler.printMsg('success', 'Note removed!');
    } else {
        chalkHandler.printMsg('error', "Note of that title doesn't exists :(!");
    }
};

/**
 * Save all notes to file
 * 
 * @param {[]Note} notes 
 */
const saveNotes = (notes) => {
    try {
        fs.writeFileSync('./json/notes.json', JSON.stringify(notes));
    } catch (error) {
        fs.mkdirSync('./json');
        fs.writeFileSync('./json/notes.json', JSON.stringify(notes));
    }
}

/**
 * Saves note to file
 * 
 * @param {Note} noteToSave 
 */
const saveNote = (noteToSave) => {
    const notes = loadNotes();

    notes.push({
        title: noteToSave.title,
        body: noteToSave.body
    })
    saveNotes(notes);

    chalkHandler.printMsg('success', 'Note added!');
}

/**
 * Prints all titles to console
 * @param {[]Note} notes
 */
const listNotes = (notes) => notes.forEach((note) => console.log(note.title));

/**
 * Prints note to console
 * @param {Note} note
 */
const printNote = (note) => {
    chalkHandler.printMsg('header', note.title + ":");
    console.log(note.body);
};

module.exports = {
    getAllNotes: loadNotes,
    addNote: addNote,
    removeNote: removeNote,
    getNote: getNote,
    removeAll: removeAll,
    listNotes: listNotes,
    printNote: printNote
};