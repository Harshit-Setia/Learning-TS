import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notesApi";
import * as NotesApi from "../network/notesApi";
import { Alert, Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"
import { ConflictError } from "../errors/http.errors";
import { useState } from "react";

interface SignUpModalProps{
    onDismiss: ()=> void,
    onSignupSuccess: (user:User)=>void,

}

const SignUpModal = ({onDismiss,onSignupSuccess}:SignUpModalProps) => {
    
    const [errorText,setErrorText]=useState<string|null>(null)
    
    const { register,handleSubmit,formState:{errors,isSubmitting}}=useForm<SignUpCredentials>()

    async function onSubmit(credentials:SignUpCredentials) {
        try {
            const newUser= await NotesApi.signUpUser(credentials)
            onSignupSuccess(newUser)
        } catch (error) {
            if(error instanceof ConflictError){
                setErrorText(error.message)
            }
            else{
                alert(error)
            }
            console.error(error)
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorText&&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required:"Required"}}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required:"Required"}}
                        error={errors.email}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required:"Required"}}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
}
 
export default SignUpModal;