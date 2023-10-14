import './style.css'
import {useState, useEffect} from 'react'

function TextField(){

    const [texto, setTexto] = useState('');
    // const [atividades, setAtividades] = useState([]); // Estado para armazenar a lista de atividades
    const [atividade, setAtividade] = useState("")
    const [notes, setNotes] = useState([]);
    const [msg, setMsg] = useState("")
    const limitText = 220
    
    const endpoint = 'http://localhost:5001/my_notes'
    // const endpoint = 'http://192.168.0.34:5001/my_notes'
    // const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';

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

    // useEffect(()=>{
    //     //Faz a requisição para api
    //     fetch(endpoint)
    //         .then(response => response.json())
    //         .then(data => { setNotes(data)} )
    //         .catch(error => { console.error('Erro ao buscar dados da api: ', error) })
    // }, [])

    useEffect(() => {
        getActivity()
    }, [])

    // const activity = (evento) =>{
    //     evento.preventDefault()
    //     const conteudo = evento.target[0].value
    //     if(conteudo !== ''){
    //         setAtividades([...atividades,conteudo])
    //     }
    // }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await fetch('http://localhost:5001/new_note', {
                method: 'POST',
                body: JSON.stringify({
                    content: atividade
                })
            })
            let resJson = await res.json()
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
    }

    const handleChange = (e) => {
        // Atualiza o estado com o texto digitado
        
        if(e.target.value.length <=limitText){
            setTexto(e.target.value);
            setAtividade(e.target.value);
        }
      };

    return (
        <div className="writeArea">
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
                <input className='writeArea-button' value='Add Nota' type="submit"/>
            </form>
            
            <div className='atividades'>
                {notes.map((note, index) => (
                    <div key={index} className='card'>
                        <p className='atividades-conteudo'>{note.note_content}</p>
                        <div className='card-buttons'>
                            <button className='editar'>Editar</button>
                            <button className='excluir'>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TextField