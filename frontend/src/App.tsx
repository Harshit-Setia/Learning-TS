import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import * as NotesApi from "./network/notesApi";
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import styles from "./styles/NotesPage.module.css";
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {
  const [loggedInUser,setLoggedInUser]=useState<User|null>(null)
  const [showSignUpModal,setShowSignUpModal]=useState(false)
  const [showLoginModal,setShowLoginModal]=useState(false)
  

  useEffect(()=>{
    (async ()=>{
      try {
        const user=await NotesApi.getLoggedInInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    })()
  },[])
  return (
    <div>
      <NavBar
        loginUser={loggedInUser}
        onLoginClicked={()=>setShowLoginModal(true)}
        onSignupClicked={()=>setShowSignUpModal(true)}
        onLogoutSuccess={()=>setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {
            loggedInUser?
            <NotesPageLoggedInView />:
            <NotesPageLoggedOutView />
          }
        </>
      </Container>
      {
          showSignUpModal &&
          <SignUpModal
            onDismiss={()=>{
              setShowSignUpModal(false)
            }}
            onSignupSuccess={(user)=>{
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}
          />
        }
        {
          showLoginModal &&
          <LoginModal
            onDismiss={()=>{
              setShowLoginModal(false)
            }}
            onLoginSuccess={(user)=>{
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        }
    </div>
  );
}

export default App;
