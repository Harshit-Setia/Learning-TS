import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css"
import stylesUtil from "./styles/utils.module.css"
import * as NotesApi from "./network/notesApi"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa"


function App() {
  const [notes,setNotes]=useState<NoteModel[]>([])

  const [showAddEditNoteDialog,setShowAddEditNoteDialog]=useState(false)

  const [noteToEdit,setNoteToEdit]=useState<NoteModel|null>(null)

  useEffect(()=>{
    (async ()=>{
      try {
        const notes=await NotesApi.fetchNote()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    })()
  },[])

  async function deleteNote(note:NoteModel){
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote=>existingNote._id!==note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Container>
      <Button 
        className={`mb-4 ${stylesUtil.blockCenter} ${stylesUtil.flexCenter}`}
        onClick={()=>{setShowAddEditNoteDialog(true)}}
      >
        Add new note
        <FaPlus/>
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note=>(
        <Col  key={note._id}>
        <Note 
          note={note}
          className={styles.note}
          onNoteClicked={setNoteToEdit}
          onDeleteNoteClicked={deleteNote}  
        />
        </Col>
      ))}
      </Row>
      {
        showAddEditNoteDialog &&
        <AddEditNoteDialog 
          onDismiss={()=>{setShowAddEditNoteDialog(false)}} 
          onNoteSave={(newNote)=>{
            setNotes([...notes,newNote])
            setShowAddEditNoteDialog(false)
          }}
        />
      }
      {
        noteToEdit &&
        <AddEditNoteDialog 
          noteToEdit={noteToEdit}
          onDismiss={()=>setNoteToEdit(null)}
          onNoteSave={(updatedNote)=>{
            setNotes(notes.map((currNote)=>currNote._id===updatedNote._id? updatedNote:currNote))
            setNoteToEdit(null)
          }}
        />
      }
    </Container>
  );
}

export default App;
