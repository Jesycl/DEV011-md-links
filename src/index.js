const axios = require('axios');
const { isAbsolutePath, convertAbsolute, routeExists, readMarkdownFile, extractLinks} = require("./functions")

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    //valida si es ruta absoluta
    const validarAbsoluta = isAbsolutePath(path)

    const rutaConvertida = validarAbsoluta ? path : convertAbsolute(path);
    //console.log({rutaConvertida});
    
    // Verifica si la ruta convertida existe
    if (routeExists(rutaConvertida)) {
      // Lee el contenido si es un archivo Markdown
      readMarkdownFile(rutaConvertida)
        .then((contenidoMarkdown) => {
          if (contenidoMarkdown !== null) {
            const links = extractLinks(contenidoMarkdown, rutaConvertida);

                 // Si validate es true, realiza solicitudes HTTP para obtener el status de cada enlace
                 if (validate) {
                  const requests = links.map((link) => {
                    return axios.head(link.href)
                      .then((response) => {
                        link.status = response.status;
                        link.ok = 'ok';
                      })
                      .catch((error) => {
                        link.status = error.response ? error.response.status : 'N/A';
                        link.ok = 'fail';
                      });
                  });
    
                  // Espera a que todas las solicitudes se completen antes de resolver la promesa
                  Promise.all(requests)
                    .then(() => resolve(links))
                    .catch(reject);
                } else {
                  // Si validate es false, resuelve la promesa directamente con los enlaces
                  resolve(links);
                }
              } else {
                reject(`La ruta "${rutaConvertida}" no es un archivo Markdown.`);
              }
            })
            .catch(reject);
        } else {
          // Si la ruta no existe, rechaza la promesa
          reject(`La ruta "${rutaConvertida}" no existe.`);
        }
      });
    };


    module.exports = {
      mdLinks
    };

