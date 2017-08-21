import React, { Component } from 'react';


class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newNoteContent: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }


    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value,
        })
    }


    componentDidMount(){
          document.querySelector(".noteInput").focus();
    }


    writeNote(){
        this.props.addNote(this.state.newNoteContent);
        document.querySelector(".noteInput").focus();
        this.setState({
            newNoteContent: '',
        })
    }


    handleSubmit(e){
      e.preventDefault()
    }


    render(){
        return(
            <div className="formWrapper">
                <form onSubmit={this.handleSubmit}>
                  <input autoFocus className="noteInput"
                  placeholder="What would you like to remember?..."
                  value={this.state.newNoteContent}
                  onChange={this.handleUserInput} />
                  <button className="noteButton"
                  onClick={this.writeNote}>Remember</button>
                </form>
            </div>
        )
    }
}

export default NoteForm;
