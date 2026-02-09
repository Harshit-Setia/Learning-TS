import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css"
import stylesUtil from "./styles/utils.module.css"
import * as NotesApi from "./network/notesApi"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa"


function App() {
  const [notes,setNotes]=useState<NoteModel[]>([])
  const [notesLoading,setNotesLoading]=useState(true)
  const [showNotesLoadingError,setShowNotesLoadingError]=useState(false)

  const [showAddEditNoteDialog,setShowAddEditNoteDialog]=useState(false)

  const [noteToEdit,setNoteToEdit]=useState<NoteModel|null>(null)

  useEffect(()=>{
    (async ()=>{
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes=await NotesApi.fetchNote()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        setShowNotesLoadingError(true)
      }
      finally{
        setNotesLoading(false)
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

  const notesGrid=
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
			{notes.map(note => (
				<Col key={note._id}>
					<Note
						note={note}
						className={styles.note}
						onNoteClicked={setNoteToEdit}
						onDeleteNoteClicked={deleteNote}
					/>
				</Col>
			))}
		</Row>

  return (
    <Container className={styles.notesPage}>
      <Button 
        className={`mb-4 ${stylesUtil.blockCenter} ${stylesUtil.flexCenter}`}
        onClick={()=>{setShowAddEditNoteDialog(true)}}
      >
        Add new note
        <FaPlus/>
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
			{showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
			{
				!notesLoading&&!showNotesLoadingError&&
				<>
					{
						notes.length>0?
						notesGrid
						:
						<p>You don't have any notes yet</p>
					}
				</>
			}
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
