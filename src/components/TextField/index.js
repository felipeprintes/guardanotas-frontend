import './style.css'
import {useState} from 'react'

function TextField(){

    const [texto, setTexto] = useState('');
    const [atividades, setAtividades] = useState([]); // Estado para armazenar a lista de atividades

    const activity = (evento) =>{
        evento.preventDefault()
        const conteudo = evento.target[0].value
        if(conteudo !== ''){
            setAtividades([...atividades,conteudo])
        }
    }

    const handleChange = (e) => {
        // Atualiza o estado com o texto digitado
        if(e.target.value.length <=10){
            setTexto(e.target.value);
        }
      };

    return (
        <div className="writeArea">
            <form onSubmit={activity}>
                <label className="writeArea-label">
                    <input type="text" 
                    name="name" 
                    maxLength={10} 
                    onChange={handleChange}
                    // onBlur={evento => setTextoDigitado(evento.target.value)} 
                    placeholder='Guarde sua ideia com a gente'/>
                </label>
                <p>{texto.length}/10</p>
                <input className='writeArea-button' value="Submit" type="submit"/>
            </form>
            
            <div className='atividades'>
                {atividades.map((item, index) => (
                    <div key={index} className='card'>
                        {item}
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