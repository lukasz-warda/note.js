const fs = require('fs');
const chalk = require('chalk');

/**
 * Adds new note to file
 * 
 * @param {Note} newNote 
 */
const addNote = (newNote) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => {
        return note.title === newNote.title;
    });

    if (duplicateNote) {
        console.log(chalk.red('Note of that title already exists!'));
    } else {
        notes.push({
            title: newNote.title,
            body: newNote.body,
        });

        saveNotes(notes);
        console.log(chalk.green('Note added!'));
    }
};

/**
 * Get note by title
 * 
 * @param {string} title
 * @returns {object} Note
 */
const getNote = (title) => {
    const notes = loadNotes();

    return notes.find((note) => {
        return note.title === title;
    });
}

/**
 * Removes note from file
 * 
 * @param {string} title 
 */
const removeNote = (title) => {
    const oldNotes = loadNotes();

    const newNotes = oldNotes.filter((note) => {
        return note.title !== title;
    });

    const hasThisNote = oldNotes.find((note) => {
        return note.title === title;
    });

    if (hasThisNote) {
        saveNotes(newNotes);
        console.log(
            chalk.red('Note ') +
            chalk.white.italic(title) +
            chalk.red(' removed!')
        );
    } else {
        console.log(chalk.magenta('There is no note to remove :('));
    }
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
 * Save note to file
 * 
 * @param {[]Note} notes 
 */
const saveNotes = (notes) => {
    fs.writeFileSync('./json/notes.json', JSON.stringify(notes));
}

module.exports = {
    getAllNotes: loadNotes,
    addNote: addNote,
    removeNote: removeNote,
    getNote: getNote,
};