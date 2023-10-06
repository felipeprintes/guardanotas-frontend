import './style.css'
import {useState} from 'react'

function TextField(){

    const [texto, setTexto] = useState('');
    const [atividade, setAtividade] = useState(''); // Estado para armazenar a atividade digitada
    const [atividades, setAtividades] = useState([]); // Estado para armazenar a lista de atividades

    const adicionarAtividade = () => {
        console.log('Entrei aqui')
        console.log(atividade)
        if (atividade.trim() !== '') {
            console.log(atividade.length)
          // Verifica se a atividade não está em branco
          setAtividades([...atividades, atividade]); // Adiciona a atividade à lista
          setAtividade(''); // Limpa o campo de texto
        }
      };

    const handleChange = (e) => {
        // Atualiza o estado com o texto digitado
        if(e.target.value.length <=10){
            setTexto(e.target.value);
        }
      };

    return (
        <div className="writeArea">
            <form>
                <label className="writeArea-label">
                    <input type="text" 
                    name="name" 
                    maxLength={10} 
                    onChange={handleChange} 
                    placeholder='Guarde sua ideia com a gente'/>
                </label>
                <p>{texto.length}/10</p>
                {/* comentado para adicionar depois type="submit" */}
                <input onClick={adicionarAtividade} className='writeArea-button' value="Submit" />
            </form>
            
            <div>
                {atividades.map((item, index) => (
                    <div key={index} className='card'>
                        {item}
                        {console.log('teste')} 
                    </div>
                ))}
            </div>


        </div>
    )
}

export default TextField