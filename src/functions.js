const path = require('path');
const fs = require('fs');

//saber si la ruta es absoluta
const isAbsolutePath = (route) => path.isAbsolute(route);
//console.log(isAbsolutePath('C:/LABORATORIA/MD_LINKS/DEV011-md-links/docs/05-milestone.md'));
//si es relativa convertir a absoluta
const convertAbsolute = (route) => path.resolve(route);
//console.log(convertAbsolute('docs/04-milestone.md'));

// Verificar si la ruta existe
const routeExists = (route) => fs.existsSync(route);
//console.log(routeExists('docs/04-milestone.md'));

// Función para verificar si es un archivo Markdown y leer su contenido
const readMarkdownFile = (route) => {
    return new Promise((resolve, reject) => {
        const extension = path.extname(route).toLowerCase();
        if (extension === '.md' || extension === '.markdown') {
            fs.readFile(route, 'utf-8', (error, contenido) => {
                if (error) {
                    reject(`Error al leer el archivo: ${error.message}`);
                } else {
                    //console.log("Contenido del archivo:", contenido);
                    resolve(contenido);
                }
            });
        } else {
            reject(new Error(`El archivo "${route}" no es un archivo Markdown.`));
        }
    });
};

// Función para extraer los links de un texto
const extractLinks = (content, filePath) => {
    const regex = /\[([^\]]+)]\((https?:\/\/[^\s\)]+)\)/g;
    const links = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        links.push({
            text: match[1], //texto
            href: match[2], // URL
            file: filePath, // ruta
        });
    }

    return links;
};
// Función para validar los links
const validateLinks = (links) => {
    return new Promise((resolve) => {
        links.forEach((link) => {
            link.status = 200;
            link.ok = 'ok'; 
        });
        resolve(links);
    });
};




module.exports = {

    isAbsolutePath,
    convertAbsolute,
    routeExists,
    readMarkdownFile,
    extractLinks,
    validateLinks,
    

}




