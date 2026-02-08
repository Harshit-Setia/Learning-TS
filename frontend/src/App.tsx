import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css"
import stylesUtil from "./styles/utils.module.css"
import * as NotesApi from "./network/notesApi"
import AddNoteDialog from './components/AddNoteDialog';


function App() {
  const [notes,setNotes]=useState<NoteModel[]>([])

  const [showAddNoteDialog,setShowAddNoteDialog]=useState(false)
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

  return (
    <Container>
      <Button 
        className={`mb-4 ${stylesUtil.blockCenter}`}
        onClick={()=>{setShowAddNoteDialog(true)}}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note=>(
        <Col  key={note._id}>
        <Note note={note} className={styles.note}/>
        </Col>
      ))}
      </Row>
      {
        showAddNoteDialog &&
        <AddNoteDialog 
          onDismiss={()=>{setShowAddNoteDialog(false)}} 
          onNoteSave={(newNote)=>{
            setNotes([...notes,newNote])
            setShowAddNoteDialog(false)
          }}
        />
      }
    </Container>
  );
}

export default App;
