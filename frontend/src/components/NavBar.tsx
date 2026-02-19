import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";

interface NavBarProps{
    loginUser:User|null,
    onSignupClicked:()=>void,
    onLoginClicked:()=>void,
    onLogoutSuccess:()=>void
}

const NavBar = ({loginUser,onLoginClicked,onLogoutSuccess,onSignupClicked}:NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    NotesApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {
                            loginUser?
                            <NavBarLoggedInView user={loginUser} onLogoutSuccess={onLogoutSuccess} />:
                            <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignupClicked={onSignupClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;