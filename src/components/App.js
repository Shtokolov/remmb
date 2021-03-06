import React, { Component } from 'react';
import './App.css';
import Note from './Note';
import NoteForm from './NoteForm';
import firebase from 'firebase';
import Login from './Login';
import scrollToComponent from 'react-scroll-to-component';

class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_666763911284
    };
    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child("notes");
    this.noteList = this.app.database().ref().child("notes");

    this.state = {
      notes: [],
      noteNode: []
    };
  }


  componentWillMount(){
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      });

      this.setState({
        notes: previousNotes
      });
    });

    this.database.on('child_removed', snap => {
      for(let i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      });
    });
  }

  togglNotesStyle() {
    if (this.state.notes.length > 0) {
      this.notesHeaderNode.classList.add("haveSomeNotes");
      this.notesBodyNode.classList.add("haveSomeNotes");
      this.notesFooterNode.classList.add("haveSomeNotes");
    }
    else {
      this.notesHeaderNode.classList.remove("haveSomeNotes");
      this.notesBodyNode.classList.remove("haveSomeNotes");
      this.notesFooterNode.classList.remove("haveSomeNotes");
    }
 }

  componentDidMount(){
    document.querySelector(".noteInput").focus();
    this.togglNotesStyle();
  }


  componentDidUpdate() {
    this.togglNotesStyle();
  }


  addNote(note){
    this.database.push().set({ noteContent: note});
  }


  removeNote(noteId){
    this.database.child(noteId).remove();
  }


  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader" ref={node => { this.notesHeaderNode = node; }}>
          <div className="heading">REMMB</div>
        </div>

        <div className="notesBody" ref={node => { this.notesBodyNode = node; }}>
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={this.removeNote}/>
              );
            })
          }
        </div>
        <div className="notesFooter" ref={node => { this.notesFooterNode = node; }}>
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
