const fs = require('fs');
const yargs = require('yargs');

const notesHandler = require('./notes');
const chalkHandler = require('./chalkHandler');
const Note = require('./classes/Note');

const titlePattern = {
    describe: 'Note title',
    demandOption: true,
    type: 'string',
};

const bodyPattern = {
    describe: 'Note body',
    demandOption: true,
    type: 'string',
};

/**
 * Add note command
 */
yargs.command({
    command: 'add',
    describe: 'Adds note',
    builder: {
        title: titlePattern,
        body: bodyPattern
    },
    handler(argv) {
        notesHandler.addNote(new Note(argv.title, argv.body));
    }
});

/**
 * Remove note command
 */
yargs.command({
    command: 'remove',
    describe: 'Removes note',
    builder: {
        title: titlePattern,
    },
    handler(argv) {
        notesHandler.removeNote(argv.title);
    }
});

/**
 * List of notes command
 */
yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler() {
        chalkHandler.printMsg('header', 'List of notes: \n');
        listNotes(notesHandler.getAllNotes());
    }
});

/**
 * Read note command
 */
yargs.command({
    command: 'read',
    describe: 'Reads note',
    builder: {
        title: titlePattern,
    },
    handler(argv) {
        note = notesHandler.getNote(argv.title);

        return note ? printNote(note) :
            chalkHandler.printMsg('error', "This note don't exists :(");
    }
});

yargs.command({
    command: 'removeAll',
    describe: 'Removes all notes',
    handler() {
        notesHandler.removeAll();
    }
});

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

yargs.parse();