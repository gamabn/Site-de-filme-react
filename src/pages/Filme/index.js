import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import { toast } from 'react-toastify';

import api from '../../services/api';
function Filme(){
    const {id} = useParams();
    const navigation = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

     useEffect(()=>{
     async function loadFilme(){
       await api.get(`/movie/${id}`, 
       {params:{
        api_key:"40ac5704c36cad9ebda9ce4358ab0885",
        language:"pt-BR",
        }
      })
      .then((response)=>{
       setFilme(response.data);
       console.log(response.data)
       setLoading(false);
      })
      .catch(()=>{
       console.log('FILME NAO ENCONTRADO');
       navigation('/',{replace: true});
       return;
      })
     }

     loadFilme();

     return ()=>{
        console.log('Componente desmontado');
     }

     }, [navigation,id])

     function salvarFilme(){

     const minhaLista = localStorage.getItem("@primeflix");

     let filmeSalvos = JSON.parse(minhaLista)  || [];

     const hasFilme = filmeSalvos.some((filmeSalvos) => filmeSalvos.id === filme.id)
     if(hasFilme){
      toast.warn("ESSE FILME JA ESTA NA LISTA");
      return;
       }
       filmeSalvos.push(filme);
       localStorage.setItem('@primeflix', JSON.stringify(filmeSalvos));
       toast.success('Filme salvo com sucesso!');
     }

     if(loading){
        return(    
        <div className='filme-info'>
          <h1>Acessando filme.....</h1>
        </div>
    )
}

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
              <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

              <h3>Sinopse</h3>
              <span>{filme.overview}</span>
              <strong>Avaliaçao:{filme.vote_average} / 10</strong>

              <div className='area-button'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                  <a target='blank' el="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>

              </div>
        </div>
    )
}
export default Filme;