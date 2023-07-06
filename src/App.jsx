import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { FaTrash, FaEdit } from 'react-icons/fa';

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
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {filmes.map((filme, index) => (
            <div key={index} className="col">
              <div className="card">
                <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/3yum4eL013NesiXjsGkaMVQecJn.jpg" className="card-img-top" alt="Filme" />
                <div className="card-body">
                  <h5 className="card-title">{filme.titulo}</h5>
                  <p className="card-text">Diretor: {filme.diretor}</p>
                  <p className="card-text">Gênero: {filme.genero}</p>
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
          ))}
        </div>
        {/* <div className="mt-4">
          <h4>Filmes Cadastrados:</h4>
          <ul className="list-group">
            {filmes.map((filme, index) => (
              <li key={index} className="list-group-item">{filme.titulo} - {filme.diretor} - {filme.genero}</li>
            ))}
          </ul>
        </div> */}
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
