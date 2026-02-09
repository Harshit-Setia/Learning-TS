import styles from "../styles/Note.module.css"
import stylesUtil from "../styles/utils.module.css"
import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"
import { formatDate } from "../util/formatDate"
import {MdDelete} from "react-icons/md"
// import 
interface NoteProps{
    note: NoteModel,
    onNoteClicked:(note:NoteModel)=>void
    className?: string
    onDeleteNoteClicked:(note:NoteModel)=>void
}

const Note=({note,className,onNoteClicked,onDeleteNoteClicked}:NoteProps)=>{
    const{
        title,
        text,
        createdAt,
        updatedAt
    }=note

    let createdUpdatedText: string

    if(updatedAt>createdAt){
        createdUpdatedText="Updated: "+ formatDate(updatedAt)
    }else{
        createdUpdatedText="Created: "+ formatDate(createdAt)
    }

    return(
        <Card
            onClick={()=>onNoteClicked(note)} 
            className={`${styles.noteCard} ${className}`}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtil.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e)=>{
                            onDeleteNoteClicked(note)
                            e.stopPropagation()
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.noteText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note