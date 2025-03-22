import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LobbyPage = ({ socket }) => {
    const navigate = useNavigate();
    const [name, setName] = useState(() => '')


    const handleCreateLobby = (e) => {
        e.preventDefault();
        console.log('Create button clicked!');
        socket.emit('create', { name: name });
        navigate('/game');
    };


    return (
        <div>
            <form onSubmit={handleCreateLobby}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button>Join Lobby</button>
            </form>
        </div >
    );
}

export default LobbyPage;
