function addNote() {
    var noteText = document.getElementById('noteInput').value;
    if (noteText.trim() !== '') {
        var noteContainer = document.getElementById('notesContainer');
        var noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        var noteMeta = document.createElement('div');
        noteMeta.className = 'note-meta';

        var deleteBtn = document.createElement('span');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = function () {
            noteContainer.removeChild(noteDiv);
            saveNotes();
        };

        var date = new Date();
        var dateString = date.toLocaleDateString();
        var timeString = date.toLocaleTimeString();

        var dateElement = document.createElement('span');
        dateElement.innerHTML = dateString;

        var timeElement = document.createElement('span');
        timeElement.innerHTML = timeString;

        noteMeta.appendChild(dateElement);
        noteMeta.appendChild(timeElement);

        noteDiv.appendChild(noteMeta);
        noteDiv.innerHTML += `<p>${noteText}</p>`;
        noteDiv.appendChild(deleteBtn);

        noteContainer.appendChild(noteDiv);

        document.getElementById('noteInput').value = '';
        saveNotes();
    }
}

function saveNotes() {
    var notes = [];
    var noteElements = document.getElementsByClassName('note');
    for (var i = 0; i < noteElements.length; i++) {
        notes.push(noteElements[i].innerHTML);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    var noteContainer = document.getElementById('notesContainer');
    var notes = JSON.parse(localStorage.getItem('notes')) || [];

    for (var i = 0; i < notes.length; i++) {
        var noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = notes[i];
        noteContainer.appendChild(noteDiv);
    }
}

// Load notes on page load
loadNotes();


function clearAll() {
    var noteContainer = document.getElementById('notesContainer');
    noteContainer.innerHTML = ''; // Clear the interface

    // Clear local storage
    localStorage.removeItem('notes');
}

// clearAll();