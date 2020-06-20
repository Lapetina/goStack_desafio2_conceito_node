const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
//const { response } = require("express");


const app = express();


app.use(express.json());
app.use(cors());


const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories)
});


app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = {
    id: uuid(), 
    title: title, 
    url: url, 
    techs: techs, 
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});


app.put("/repositories/:id", (request, response) => {
  /**PUT /repositories/:id: A rota deve alterar 
  apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;
  */ 
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: 'Not found repository'});
  }

  const likes = repositories[repositoryIndex].likes

  const repository = {
    id: uuid(id),
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoryIndex] = repository;

  console.log(title)

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
    
  if (repositoryIndex < 0){
      return response.status(400).json({ error: 'Not found repository'})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  //POST /repositories/:id/like: A rota deve aumentar o número de likes do repositório específico escolhido 
  //através do id presente nos parâmetros da rota, a cada chamada dessa rota, o número de likes deve ser aumentado 
  //em 1;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: 'Not found repository'});
  }

  repositories[repositoryIndex].likes += 1

  const repository = repositories[repositoryIndex]

  return response.json(repository);

});

module.exports = app;
