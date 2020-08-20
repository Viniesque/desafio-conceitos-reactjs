import React, { useState, useEffect } from 'react';
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/Viniesque/conceitos-nodejs",
      techs: "NodeJS",
	    likes: 0,
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }


  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const repository = [...repositories];
    repository.splice(repositoryIndex, 1);
    setRepositories(repository);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
