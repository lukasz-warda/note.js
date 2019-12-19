const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
const Note = require('./classes/Note');

// add note
yargs.command({
    command: 'add',
    describe: 'Adds note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        const note = new Note(argv.title, argv.body);
        notes.addNote(note);
    }
});

//remove note
yargs.command({
    command: 'remove',
    describe: 'Removes note',
    builder: {
        title: {
            demandOption: true,
            describe: 'Note title',
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

//lists notes
yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler: () => {
        console.log(chalk.blue.inverse.bold('List of notes: \n'));
        listNotes(notes.getAllNotes());
    }
});

//read note
yargs.command({
    command: 'read',
    describe: 'Reads note',
    builder: {
        title: {
            demandOption: true,
            describe: 'Note title',
            type: 'string'
        }
    },
    handler: (argv) => {
        const note = notes.getNote(argv.title);

        if (note) {
            console.log(chalk.inverse.blue.bold(note.title + ":"));
            console.log(note.body);
        } else {
            console.log(chalk.red("This note don't exists :("));
        }
    }
});

const listNotes = (notes) => {
    for (note of notes) {
        console.log(note.title);
    }
}

yargs.parse();