import { useState } from 'react'
import './App.css'
import useGithubRepositories from "./components/useGithubRepostories/useGithubRepositories";

type RepositoryState = {
  id:number;
  liked: boolean;
}

function App() {

  const { repos, error, isLoading } = useGithubRepositories({org : 'google'})
  const[repositoryLikes, setRepositoryLikes] = useState<RepositoryState[]>([]);

  function toggleLike(id: number) {
    setRepositoryLikes(prevState=>{
      const exists = prevState.find((r)=>r.id===id);

      if(exists){
        return prevState.map((r)=>
        r.id === id ? {...r, liked: !r.liked} : r
        );
      }
      return[...prevState, {id, liked:true}];
    })
  }

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar os dados</p>}
      {repos.map((repo) => {
        const isLiked = repositoryLikes.find((r)=>r.id===repo.id)?.liked;
        return (
          <div key={repo.id}>
            <h2>
              {repo.full_name}
              <span>by {repo.owner.login}</span>
              <button onClick={() => toggleLike(repo.id)}>
                {isLiked ? 'Descurtir' : 'Curtir'}
              </button>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default App
