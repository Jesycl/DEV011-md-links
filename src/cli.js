const { mdLinks } = require(".");

// mdLinks('README.md')
// .then(res => console.log("esta es la respuesta", res))
// .catch(err => console.log ("este es el error", err))


const filePath = './test/prueba.txt';
const validate = true;

mdLinks(filePath, validate)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });