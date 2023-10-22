import React, { useState } from 'react';
import './style.css'

function CardEdit({ note, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.note_content);
  const [msg, setMsg] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Lógica para salvar as alterações no card no banco de dados (por exemplo, enviar uma solicitação PUT para a API)
    setIsEditing(false);
    

    
    let res = fetch('http://localhost:5001/edit_note',{
      method: 'POST',
      body: JSON.stringify({
        '_id': note._id,
        'note_content': editedContent
      })
    }).then(response => response.json())
      .then((data => {onEdit(note._id)}))
      .catch((error => {console.error('Erro ao editar o card: ', error)}))
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value)
  }

  const handleCancelClick = () => {
    setIsEditing(false);
  };

return (
    <div className='edit'>
      {isEditing ? (
        <div className="editing-screen">
          
          <div className="edit-card">
          <h1>Edite seu card</h1>
            <textarea
              value={editedContent}
              // onChange={(e) => setEditedContent(e.target.value)}
              onChange={handleChange}
            />
            <div className='buttonAreas'>
              <button onClick={handleSaveClick} className='editar'>Salvar</button>
              <button onClick={handleCancelClick} className='cancelar'>Cancelar</button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={handleEditClick} className='editar'>Editar</button>
      )}
    </div>
  );
}

export default CardEdit;
