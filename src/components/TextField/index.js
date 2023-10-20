import './style.css'
import {useState, useEffect} from 'react'
import Card from '../botaoExcluir'
import CardEdit from '../botaoEditar';

function TextField(){

    const [texto, setTexto] = useState('');
    const [atividade, setAtividade] = useState("");
    const [notes, setNotes] = useState([]);
    const [msg, setMsg] = useState("");
    const limitText = 220;
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const endpoint = 'http://localhost:5001/my_notes'

    const getActivity = async () => {
        try{
            const resposta = await fetch(endpoint)
            if(resposta.ok){
                const dadosRecebidos = await resposta.json()
                setNotes(dadosRecebidos)
            } else {
                console.error("Erro na requisição")
            }
        } catch (erro) {
            console.erro('Erro de requisição Get', erro)
        }
    }

    useEffect(() => {
        getActivity()
    }, [])

    

    let handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(async () => {
            try{
                let res = await fetch('http://localhost:5001/new_note', {
                    method: 'POST',
                    body: JSON.stringify({
                        content: atividade
                    })
                })
                if (res.status===200){
                    setAtividade("")
                    setMsg("Atividade criada com sucesso")
                    getActivity();
                }else {
                    setMsg("Erro ao cadastrar atividade")
                }
            } catch (err){
                console.log(err)
            }
            setIsLoading(false)
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
              }, 1000);
        }, 1000)        
        
    }
    const [cards, setCards] = useState([]);

    const handleDeleteCard = () => {
        getActivity();
      };

    const handleChange = (e) => {
        // Atualiza o estado com o texto digitado
        
        if(e.target.value.length <=limitText){
            setTexto(e.target.value);
            setAtividade(e.target.value);
        }
      };

    return (
        <div className="writeArea">
            {isLoading ? (
                <div className='loading-container'>
                    <div className='spinner'></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                <label className="writeArea-label">
                    <input type="text" 
                    name="name" 
                    maxLength={limitText} 
                    onChange={handleChange}
                    // onBlur={evento => setTextoDigitado(evento.target.value)} 
                    placeholder='Guarde sua ideia com a gente'/>
                </label>
                <p>{texto.length}/{limitText}</p>
                {showSuccessMessage && <div className="success-message">Adicionado com sucesso</div>}
                <input className='writeArea-button' value='Add Nota' type="submit"/>
            </form>
            )}
            
            <div className='atividades'>
                {notes.map((note, index) => (
                    <div key={index} className='card'>
                        <p className='atividades-conteudo'>{note.note_content}</p>
                        <div className='card-buttons'>
                            {/* <button className='editar'>Editar</button> */}
                            <Card key={note._id} note={note} onDelete={handleDeleteCard}/>
                            <CardEdit key={note._id} note={note}/>
                            {/* <button className='excluir' onClick={handleDelete}>Excluir</button> */}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        
    )
}

export default TextField