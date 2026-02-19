import { Container } from "react-bootstrap";
import { User } from "../models/user";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import styles from "../styles/NotesPage.module.css";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";

interface NotesPageProps{
    loggedInUser: User|null
}

const NotesPage = ({loggedInUser}:NotesPageProps) => {
    return (
        <Container className={styles.notesPage}>
        <>
          {
            loggedInUser?
            <NotesPageLoggedInView />:
            <NotesPageLoggedOutView />
          }
        </>
      </Container>
    );
}
 
export default NotesPage;