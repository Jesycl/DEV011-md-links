const { mdLinks } = require(".");

mdLinks('README.md')
.then(res => console.log("esta es la respuesta", res))
.catch(err => console.log ("este es el error", err))


// Reemplaza 'ruta/al/archivo.md' con la ruta real de tu archivo Markdown
const filePath = 'README.md';
const validate = true; // Puedes cambiar esto a false si no quieres validar los enlaces

mdLinks(filePath, validate)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });