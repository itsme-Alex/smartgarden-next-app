// AddElectrovalveForm.js

import React, { useState } from 'react';

const AddElectrovalveForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter le code pour envoyer les données à votre API
        console.log("Nouvelle électrovanne ajoutée:", { name, position });

        // Fermer la modale après l'ajout
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom de l'électrovanne:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Position de l'électrovanne:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddElectrovalveForm;
