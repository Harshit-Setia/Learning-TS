import { Note } from "../models/note"
import { User } from "../models/user"

async function fetchData(input: RequestInfo,init?: RequestInit){
    const response = await fetch(input,init)
    if(response.ok){
        return response
    }
    else{
        const errorBody=await response.json()
        const errorMessage=errorBody.error
        throw Error(errorMessage)
    }
}

export async function getLoggedInInUser(): Promise<User>{
    const response=await fetchData("/api/users",{method:"GET"})
    return response.json()
}

export interface SignUpCredentials{
    username:string,
    email:string,
    password:string
}
export async function signUpUser(credentials:SignUpCredentials): Promise<User>{
    const response=await fetchData("/api/users/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials{
    username:string,
    password:string
}

export async function loginUser(credentials:LoginCredentials): Promise<User>{
    const response=await fetchData("/api/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout(){
    await fetchData("/api/users/logout",{method:"DELETE"})
}

export async function fetchNote(): Promise<Note[]>{
    const response= await fetchData("/api/notes",{method: "GET"})
    return response.json()
}

export interface NoteInput{
    title: string,
    text?: string
}

export async function createNote(note: NoteInput): Promise<Note>{
    const response = await fetchData("/api/notes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(note)
    })
    const data=await response.json()
    return data.note
}

export async function updateNote(noteID:string,note:NoteInput): Promise<Note>{
    const response = await fetchData("/api/notes/"+noteID,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(note)
        }
    )
    const data=await response.json()
    return data.note
}

export async function deleteNote(noteID:string){
    await fetchData("/api/notes/"+noteID,{method:"DELETE"})
}