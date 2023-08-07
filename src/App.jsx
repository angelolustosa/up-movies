import { useEffect, useState } from 'react'
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
        <div className="row">
          {filmes.map((filme, index) => (
            <div class="col-lg-2 mt-3 mb-3 d-flex align-items-stretch">
              <div class="card">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#868e96"></rect>
                  <text x="30%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <div class="card-body d-flex flex-column">
                  <h5 className="card-title">{filme.titulo}</h5>
                  <p class="card-text mb-4">{`${filme.diretor?.trim()} | ${filme.genero?.trim()}`}</p>
                  <a href="#" class="mt-auto align-self-start">
                    <button className="btn btn-primary" style={{ marginRight: '0.5em' }} onClick={() => editarFilme(index)}>
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
      </div >
    </>
  )
}

export default App
