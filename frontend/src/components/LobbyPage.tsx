import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LobbyPage = ({ socket }) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [clickedButton, setClicked] = useState('')

    console.log(`Status: ${clickedButton}`);

    const handleSubmit = () => {
        if (clickedButton === "create") {
            console.log(`${name} has created a lobby`);
            return true;
        } else if (clickedButton === "join") {
            console.log(`$(name) has joined a lobby`);
            return true;
        } else {
            console.log("Enter was pressed");
            return false;
        }
    }

    const handle

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => { setClicked("create") }}>Create Lobby</button>
                <button onClick={() => { setClicked("join") }}>Join Lobby</button>
            </form>
            <button onClick={
                { handleSubmit() ? <p>Lobby Created!</p> : <p>Lobby Joined</p>}
        </div>
    );
}

export default LobbyPage;
