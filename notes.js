const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

// First loads note and then push notes in array
const addNote = function (title, body){
    const notes = loadNotes()
    // console.log(notes)
    
    // checks if title is duplicate or not, will return true or false accordingly, 
    // filter method returns an array
    const duplicateNote = notes.filter(function(note) {
        return note.title === title
    })

    if(duplicateNote.length === 0){
        notes.push({
            title:title,
            body:body
        })
        
        console.log(chalk.green.bold('Adding Note'))
        console.log(chalk.cyan("title : "+title+'\n'+'body : '+body))

        saveNotes(notes)
    }else{
        console.log(chalk.red('Note title already exists'))
    }
    
}

// removes a note according to title
const removeNote = function(title){
    const notes = loadNotes()

    const ExcludeRemovingNote = notes.filter(function(note){
        // this will return an list of array which does not have removing title note
        return note.title !== title
    })
    saveNotes(ExcludeRemovingNote)
    if(notes.length > ExcludeRemovingNote.length){
        console.log(chalk.green('Note removed'))
    }else{
        console.log(chalk.red('Note title does not exists'))
    }
}

// list notes
const listNotes = function(){
    const notes = loadNotes()
    
    notes.forEach((note) => {
        console.log(chalk.green(note.title))
    })
}

// creates json file and saves data in it
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// reads file and loads data in an array
const loadNotes = function () {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        //returns empty array if file doesn't exists
        return []
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const read = notes.find((note)=>{
        return note.title === title
    })

    if(read){
        console.log(chalk.magenta('Reading note'))
        console.log(chalk.green(read.title)+'\n'+chalk.green(read.body))
    }else{
        console.log(chalk.red('No such title exists'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    listNotes:listNotes,
    readNote:readNote,
    removeNote: removeNote
}