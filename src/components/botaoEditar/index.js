import React, { useState } from 'react';
import './style.css'

function CardEdit({ note, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.note_content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Lógica para salvar as alterações no card no banco de dados (por exemplo, enviar uma solicitação PUT para a API)
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

//   return (
//     <div>
//       <p>ID do Card: {note._id}</p>
//       {isEditing ? (
//         <div>
//           <textarea
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//           <button onClick={handleSaveClick}>Salvar</button>
//           <button onClick={handleCancelClick}>Cancelar</button>
//         </div>
//       ) : (
//         <p>Conteúdo do Card: {note.note_content}</p>
//       )}
//       <button onClick={handleEditClick}>Editar</button>
//       <button onClick={() => onDelete(note._id)}>Excluir</button>
//     </div>
//   );
return (
    <div className='edit'>
      {isEditing ? (
        <div className="editing-screen">
          
          <div className="edit-card">
          <h1>Edite seu card</h1>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
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
