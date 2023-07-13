import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { FaTrash, FaEdit } from 'react-icons/fa';
import moment from 'moment/moment';

function App() {
  const [filmes, setFilmes] = useState([]);
  const [novoFilme, setNovoFilme] = useState({
    titulo: '',
    diretor: '',
    genero: ''
  });

  const [editIndex, setEditIndex] = useState(-1);

  /* const adicionarFilme = (e) => {
    e.preventDefault();
    setFilmes([...filmes, novoFilme]);
    setNovoFilme({
      titulo: '',
      diretor: '',
      genero: ''
    });
  }; */

  const adicionarFilme = e => {
    e.preventDefault();

    if (editIndex === -1) {
      setFilmes([...filmes, novoFilme]);
    } else {
      const filmesAtualizados = [...filmes];
      filmesAtualizados[editIndex] = novoFilme;
      setFilmes(filmesAtualizados);
      setEditIndex(-1);
    }

    setNovoFilme({
      titulo: '',
      diretor: '',
      genero: ''
    });
  };


  const editarFilme = (index) => {
    setNovoFilme(filmes[index]);
    setEditIndex(index);
  };

  const excluirFilme = (index) => {
    const filmesAtualizados = filmes.filter((_, i) => i !== index);
    setFilmes(filmesAtualizados);
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=48e701db3f552e0a51c09d43137bd270')
      .then(res => res.json())
      .then(json => {
        //console.log(json.results)
        setFilmes(json.results)
      })
  }, [])


  return (
    <>
      <div className="container mt-4">
        <h2>Cadastro de Filmes</h2>
        <form onSubmit={adicionarFilme}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input type="text" id="titulo" value={novoFilme.titulo} onChange={(e) => setNovoFilme({ ...novoFilme, titulo: e.target.value })} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="diretor" className="form-label">Diretor</label>
            <input type="text" id="diretor" value={novoFilme.diretor} onChange={(e) => setNovoFilme({ ...novoFilme, diretor: e.target.value })} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input type="text" id="genero" value={novoFilme.genero} onChange={(e) => setNovoFilme({ ...novoFilme, genero: e.target.value })} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Adicionar Filme</button>
        </form>
        <div className="row">
          {filmes.map((filme, index) => (
            <div class="col-lg-2 mb-3 d-flex align-items-stretch">
              <div class="card">
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
                <div class="card-body d-flex flex-column">
                  <h5 className="card-title">{filme.title}</h5>
                  {/* <p class="card-text mb-4">Is a manmade waterway dug in the early 1600's and now displays many landmark commercial locals and vivid neon signs.</p> */}
                  <p class="card-text mb-4">{filme.overview.trim()}</p>
                  <a href="#" class="mt-auto align-self-start">
                    <button className="btn btn-primary" style={{ marginRight: '0.5em'}} onClick={() => editarFilme(index)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger" onClick={() => excluirFilme(index)}>
                    <FaTrash />
                  </button>
                </a>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">{`Lançamento: ${moment(filme.release_date).format("DD/MM/YYYY")}`}</small>
              </div>
            </div>
            </div>
          ))}
      </div>

      {/* https://codepen.io/Kerrys7777/pen/QWgwEeG?editors=1000*/}
      {/*  <div className="row">
        <div class="col-lg-4 mb-3 d-flex align-items-stretch">
        <div class="card">
          <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
          <div class="card-body d-flex flex-column">
            <h5 className="card-title">{filme.title}</h5>
            <p class="card-text mb-4">Is a manmade waterway dug in the early 1600's and now displays many landmark commercial locals and vivid neon signs.</p>
            <a href="#" class="btn btn-primary mt-auto align-self-start">Book now</a>
          </div>
          <div className="card-footer">
                  <small className="text-body-secondary">{`Lançamento: ${moment(filme.release_date).format("DD/MM/YYYY")}`}</small>
                </div>
        </div>
      </div> 
      </div>*/}
    </div >
    </>
  )
}

export default App
