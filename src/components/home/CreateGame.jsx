import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useNavigate } from "react-router-dom"

export default function CreateGame({userId}){
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    async function NewGame(){
        if(title === ""){
            alert("Enter a title for your game.")
            return
        }
        if(title === "Loading..."){
            alert("Invalid game title.")
            return
        }

        try{
            await addDoc(collection(db, "Games"), {
                "title":title,
                "userid": userId,
                "colour":"red"
            }).then(docRef => {
                navigate("/dashboard", {state:{gameid:docRef.id}})
            })
            
        }
        catch(err){console.error(err)}
    }

    return (
        <>
            <h1>Create a New Game</h1>
            <input
                placeholder="Title..."
                onChange={e => setTitle(e.target.value)}
                className='form-input'
            />
            <button onClick={() => NewGame()} className='form-btn'>Create</button>
        </>
    )
}