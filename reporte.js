const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    let lista = response.data.result;

    for (let i = 0; i < lista.length; i++) {
      let urlconjutodatos = 'https://datosabiertos.gob.ec/api/3/action/package_show?id=' + lista[i];
      axios.get(urlconjutodatos)
        .then(response => {
          let datosConjunto = response.data.result;

          console.log(i + 1, datosConjunto.title);
          console.log(datosConjunto.name);
          console.log(datosConjunto.organization.title);
          console.log(datosConjunto.metadata_created);
          console.log(datosConjunto.metadata_modified);
        })
        .catch(error => {
          console.error("------------error en el for interno");
        });
    }
  })
  .catch(error => {
    console.error("+++++++++++++++++error enel for externo");
  });
