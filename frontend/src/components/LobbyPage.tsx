import { useState } from 'react';

const LobbyPage = ({ socket }) => {
    const [name, setName] = useState('');
    const [clickedButton, setClicked] = useState('');

    const handleCreateLobby = (e) => {
        e.preventDefault();
        console.log(`${name} has created a lobby!`);
    }

    return (
        <div>
            <form action={handleCreateLobby}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleCreateLobby}>Create Lobby</button>
                <button onClick={handleCreateLobby}>Join Lobby</button>
            </form>
        </div>
    );
}

export default LobbyPage;
