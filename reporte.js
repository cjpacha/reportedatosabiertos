const axios = require('axios');

async function imprimir() {
  try {
    const response = await axios.get('https://datosabiertos.gob.ec/api/3/action/package_list');
    let lista = response.data.result;

    for (let i = 0; i < lista.length; i++) {
      let urlconjutodatos = 'https://datosabiertos.gob.ec/api/3/action/package_show?id=' + lista[i];

      try {
        const response = await axios.get(urlconjutodatos);
        let datosConjunto = response.data.result;
        console.log(i + 1, datosConjunto.title);
        console.log(datosConjunto.name);
        console.log(datosConjunto.organization.title);
        console.log(datosConjunto.metadata_created);
        console.log(datosConjunto.metadata_modified);
      } catch (error) {
        console.error("Error");
      }
    }
  } catch (error) {
    console.error("Error");
  }
}

imprimir();
