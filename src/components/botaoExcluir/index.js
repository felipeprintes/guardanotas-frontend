import './style.css' 

function Card({note, onDelete}) {
    const handleDeleteClick = (e) => {
        console.log('ID: ', note._id)
        console.log('NOTE_CONTENT: ', note.note_content)
        let res = fetch('http://localhost:5001/delete_note', {
            method: 'POST',
            body: JSON.stringify({
                id: note._id,
                content: note.note_content
            })
        }).then(response => response.json())
          .then((data) => {
            onDelete(note._id)
          })
          .catch((error) => {
            console.error('Erro ao excluir o card', error)
        })
        
    }

    return (
        <div>
            {/* <p>ID do Card: {card._id}</p> */}
            {/* <p>Conteúdo do Card: {card.content}</p> */}
            <button onClick={handleDeleteClick} className='excluir'>Excluir</button>
        </div>
    )
}

export default Card