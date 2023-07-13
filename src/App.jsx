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
        <div className="row row-cols-1 row-cols-md-6 mt-4">
          {filmes.map((filme, index) => (
            <div className="col mb-2">
              <div className="card" /* style={{ height: '44rem' }} */ style={{ height: '38rem' }} >
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
                <div className="card-body">
                  <h5 className="card-title">{filme.title}</h5>
                  <p>Diretor: {filme.diretor}</p>
                  <p>Gênero: {filme.genero}</p>
                  <div id='buttons'>
                    <button className="btn btn-primary me-2" onClick={() => editarFilme(index)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger" onClick={() => excluirFilme(index)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">{`Lançamento: ${moment(filme.release_date).format("DD/MM/YYYY")}`}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* https://codepen.io/Kerrys7777/pen/QWgwEeG?editors=1000*/}
        {/*   { <div className="col mb-2">
              <div className="card h-100 ">
              <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
                  <div className="card-body">
                    <h5 className="card-title">{filme.title}</h5>
                    <p className="card-text">{filme.overview}</p>
                  </div>
              </div>
            </div>} */}

        {/* {} */}

        {/* <div className="container">
              <div className="col-lg-12 mb-3 d-flex align-items-">
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{filme.title}</h5>
                    <p className="card-text">{filme.overview}</p>
                    <a href="#" className="btn btn-primary mt-auto align-self-start">Book now</a>
                  </div>
                </div>
              </div>
            </div> */}


        {/* <div className="card-group" style={{width: '20em', height: 'fit-content'}}>
              {console.log(filme)}
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
                <div className="card-body">
                  <h5 className="card-title">{filme.title}</h5>
                  <p className="card-text">{filme.overview}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">{`Lançamento: ${moment(filme.release_date).format("DD/MM/YYYY")}`}</small>
                </div>
              </div>
            </div> */}

        {/* <div className="mt-4">
          <h4>Filmes Cadastrados:</h4>
          <ul className="list-group">
            {filmes.map((filme, index) => (
              <li key={index} className="list-group-item">{filme.titulo} - {filme.diretor} - {filme.genero}</li>
            ))}
          </ul>
        </div> */}
      </div>


      {/* <div key={index}>
        {console.log(filme)}
        <div key={index} className="card" style={{ width: '12em' }}>
          <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
          <div className="card-body">
            <div key={index} className="card" style={{ width: '12em', height: '32rem' }}>
              <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${filme.poster_path}`} className="card-img-top" alt="Filme" />
              <div className="card-body">
                <h5 className="card-title">{filme.title}</h5>
                <p>Diretor: {filme.diretor}</p>
                <p>Gênero: {filme.genero}</p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary me-2" onClick={() => editarFilme(index)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger" onClick={() => excluirFilme(index)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default App
