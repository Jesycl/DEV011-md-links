
//const mdLinks = require('../src/functions');

const { isAbsolutePath, convertAbsolute, routeExists, readMarkdownFile, extractLinks, validateLinks } = require('../src/functions');
const path = require('path');
const fs = require('fs');


describe('isAbsolutePath', () => {
  it('Debería devolver verdadero para una ruta absoluta', () => {
    const absolutePath = 'C:/LABORATORIA/MD_LINKS/DEV011-md-links/docs/02-milestone.md';
    const result = isAbsolutePath(absolutePath);
    expect(result).toBe(true);
  });
  
  it('Debería devolver falso para una ruta relativa', () => {
    const relativePath = 'docs/02-milestone.md';
    const result = isAbsolutePath(relativePath);
    expect(result).toBe(false);
  });
});

describe('convertAbsolute', () => {
  test('debería convertir la ruta relativa a la ruta absoluta', () => {
    const relativePath = 'docs/02-milestone.md';
    const absolutePath = convertAbsolute(relativePath);
    const expectedPath = path.resolve(relativePath);
    expect(absolutePath).toBe(expectedPath);
  });
});

describe('routeExists', () => {
  test('debería devolver true si la ruta existe', () => {
    // Supongamos que tienes una ruta existente en tu sistema de archivos
    const existingRoute = 'docs/02-milestone.md';
    const result = routeExists(existingRoute);
    expect(result).toBe(true);
  });

  test('debería devolver false si la ruta no existe', () => {
    // Supongamos que tienes una ruta que no existe en tu sistema de archivos
    const nonExistingRoute = 'docs/07-milestone.md';
    const result = routeExists(nonExistingRoute);
    expect(result).toBe(false);
  });
});

describe('readMarkdownFile', () => {
  afterEach(() => {
    // Restauramos la implementación original de fs.readFile después de cada prueba
    jest.restoreAllMocks();
  });

  test('debería leer correctamente el archivo Markdown', () => {
    const mdFilePath = 'README.md';
    const contenidoEsperado = 'Contenido del archivo Markdown';

    // Simulamos la lectura del archivo utilizando jest.spyOn para mockear fs.readFile
    jest.spyOn(fs, 'readFile').mockImplementation((path, options,callback) => {
      callback(null, contenidoEsperado);
    });

    // Ejecutamos la función y verificamos que la promesa se resuelva correctamente
    return readMarkdownFile(mdFilePath).then((resultado) => {
      expect(resultado).toBe(contenidoEsperado);
    });
  });

  test('debería rechazar la promesa si hay un error al leer el archivo', () => {
    const mdFilePath = 'REME.md';
    const errorEsperado = new Error('Error simulado');

    // Simulamos un error al leer el archivo utilizando jest.spyOn para mockear fs.readFile
    jest.spyOn(fs, 'readFile').mockImplementation((path, options,callback) => {
      callback(errorEsperado);
    });

    // Ejecutamos la función y verificamos que la promesa se rechace correctamente
    return readMarkdownFile(mdFilePath).catch((error) => {
      expect(error).toEqual(`Error al leer el archivo: ${errorEsperado.message}`);
      // Restauramos la implementación original de fs.readFile después de la prueba
      
    });
  });

  test('debería rechazar la promesa si la extensión del archivo no es .md o .markdown', () => {
    const nonMdFilePath = 'ruta/al/archivo.txt';

    // Ejecutamos la función y verificamos que la promesa se rechace correctamente
    return readMarkdownFile(nonMdFilePath).catch((error) => {
      expect(error.message).toBe('El archivo "ruta/al/archivo.txt" no es un archivo Markdown.');
    });
  });
});

// Describe el conjunto de pruebas para la función extractLinks
describe('extractLinks', () => {
  // Prueba 1: Verifica que la función extraiga correctamente los enlaces de un texto
  test('debería extraer enlaces correctamente', () => {
      const content = 'Este es un texto con un enlace [Google](https://www.google.com)';
      const filePath = '/ruta/a/tu/archivo.txt';

      const result = extractLinks(content, filePath);

      // Espera que el resultado sea un arreglo con un objeto que tiene las propiedades text, href y file
      expect(result).toEqual([
          {
              text: 'Google',
              href: 'https://www.google.com',
              file: '/ruta/a/tu/archivo.txt',
          },
      ]);
  });
});

describe('validateLinks', () => {
  it('debería devolver enlaces con estado 200 y mensaje "ok"', async () => {
    // Enlaces de ejemplo
    const links = [
      { href: 'https://ejemplo.com', text: 'Ejemplo', file: '/ruta/al/archivo.md' },
      { href: 'https://ejemplo2.com', text: 'Ejemplo 2', file: '/ruta/al/archivo.md' },
    ];

    // Llamar a la función
    const result = await validateLinks(links);

    // Verificar la salida
    result.forEach(link => {
      expect(link.status).toBe(200);
      expect(link.ok).toBe('ok');
    });
  });

  it('debería manejar enlaces vacíos', async () => {
    // Enlaces de ejemplo
    const links = [];

    // Llamar a la función
    const result = await validateLinks(links);

    // Verificar la salida (debería ser un arreglo vacío)
    expect(result).toEqual([]);
  });

  
});