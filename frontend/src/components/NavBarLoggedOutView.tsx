import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps{
    onSignupClicked:()=>void,
    onLoginClicked:()=>void
}

const NavBarLoggedOutView = ({onLoginClicked,onSignupClicked}:NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignupClicked}>Signup</Button>
            <Button onClick={onLoginClicked}>Login</Button>
        </>
    );
}
 
export default NavBarLoggedOutView;