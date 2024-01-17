const { mdLinks } = require('../src/index'); // Ajusta la ruta según tu estructura de carpetas

//const axios = require('axios');

//jest.mock('axios'); // Mockear axios para evitar llamadas HTTP reales durante las pruebas

describe('mdLinks', () => {
  test('debería devolver los enlaces sin validación', () => {
    const path = './test/prueba.md'; // Ajusta la ruta según tu estructura de carpetas
    const validate = false;

    return mdLinks(path, validate).then((links) => {
      expect(links).toEqual([
        {
          text: 'Empanadas',
          href: 'https://es.wikipedia.org/wiki/Empanada',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        },
        {
          text: 'Empanadas34',
          href: 'https://es.wikipedia.org/wiki/EmpanadaInformacion',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        },
        {
          text: 'Tacos de Canasta',
          href: 'https://es.wikipedia.org/wiki/Taco',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        },
        {
          text: 'Feijoada',
          href: 'https://es.wikipedia.org/wiki/Feijoada',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        },
        {
          text: 'Single-page Application (SPA)',
          href: 'https://es.wikipedia.org/wiki/Single-page_application',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        },
        {
          text: '_responsive_',
          href: 'https://curriculum.laboratoria.la/es/topics/css/02-responsive',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md'
        }
      ]);
    });
  });

  test('debería devolver los enlaces con validación', () => {
    const path = './test/prueba.md'; // Ajusta la ruta según tu estructura de carpetas
    const validate = true;

    // Mockear las respuestas HTTP para evitar llamadas reales durante las pruebas
    //axios.head.mockResolvedValueOnce({ status: 200 });
    // Puedes añadir más respuestas mockeadas según tus necesidades

    return mdLinks(path, validate).then((links) => {
      // Asegúrate de ajustar las expectativas según la salida esperada
      expect(links).toEqual([
        {
          text: 'Empanadas',
          href: 'https://es.wikipedia.org/wiki/Empanada',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          text: 'Empanadas34',
          href: 'https://es.wikipedia.org/wiki/EmpanadaInformacion',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 404,
          ok: 'fail'
        },
        {
          text: 'Tacos de Canasta',
          href: 'https://es.wikipedia.org/wiki/Taco',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          text: 'Feijoada',
          href: 'https://es.wikipedia.org/wiki/Feijoada',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          text: 'Single-page Application (SPA)',
          href: 'https://es.wikipedia.org/wiki/Single-page_application',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          text: '_responsive_',
          href: 'https://curriculum.laboratoria.la/es/topics/css/02-responsive',
          file: 'C:\\LABORATORIA\\MD_LINKS\\DEV011-md-links\\test\\prueba.md',
          status: 200,
          ok: 'ok'
        }
      ]);
    });
  });
  });
