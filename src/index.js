const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { connect } = require("../connection/dbConnection.js")

const projects = [];

function logRoutes(request, response, next) {
  const { method, url } = request
  const route = `[${method.toUpperCase()}] ${url}`
  console.log(route)
  return next()
}

connect().then(() => {
  const app = express();
  app.use(express.json());
  app.get('/projects', (request, response) => response.json(projects));

  app.post("/projects", logRoutes, (request, response) => {
    const { name, owner } = request.body;
    const project = {
      id: uuidv4(),
      name,
      owner,
    };
    projects.push(project);

    return response.status(201).json(project);
  });

  app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { name, owner } = request.body;

    const projectIndex = projects.findIndex((p) => p.id === id);
    if (projectIndex < 0) {
      return response.status(404).json({ error: 'Project not found' });
    }

    if (!name || !owner) {
      return response.status(400).json({ error: 'Name or owner are required' });
    }

    const project = {
      id,
      name,
      owner,
    };

    projects[projectIndex] = project;

    console.log(id, name, owner);
    return response.json(project);
  });

  app.delete('/projects/:id', function (request, response) {
    const { id } = request.params;

    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex < 0) {
      return response.status(404).json({ error: "Project not found" });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send()
  });
  app.listen(3000, () => console.log('O servidor está escutando na porta 3000'));

}).catch((error) => {
  console.log("Something get wrong!")
})





// app.use(logRoutes)




// GET http://localhost:3000/projects



// mongodb+srv://hugosolid:<password>@simple-api.glnyshj.mongodb.net/?retryWrites=true&w=majority
