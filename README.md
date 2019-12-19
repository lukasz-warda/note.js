## Notes app
It's a small command-line app written in node.js. Which stores simple notes in JSON file.

I'm just trying to learn node :P.
## Installation
Clone repository, then go into directory and execute command:
```
npm install
```
## Usage
Go into app directory, and execute commands like this:
```
node app.js command
```
## Avaiable commands:
### Create note:
```
add --title="Your title" --body="Body of note"
```
### Read note:
```
read --title="Title of your note"
```
### List your notes:
```
list
```
### Remove note:
```
remove --title="Title of your note"
```