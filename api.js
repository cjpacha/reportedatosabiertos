//inicio de desarrollo 11 de julio de 2023

const axios = require('axios');

let conjutodatos = 'https://datosabiertos.gob.ec/api/3/action/package_show?id=';

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    let listadataset = response.data.result;
    
    for (i = 0; i < listadataset.length; i++) {
      // imprimir la lista de los nombres de los conjutos de datos numeradas
      //console.log(i+1, listadataset[i]);
      
      // se imprime una cadena de URL, URL que permitirá ir a obtener los detalles de cada conjuto de datos
      
      console.log(i+1, conjutodatos + listadataset[i]);

      axios.get(conjutodatos + listadataset[i])
        .then(response2 => {
          let completodataset = response2.data.result.organization.name;
          console.log(completodataset);

          })
          .catch(error => {
          console.error(error);
      });

      console.log("TOTAL DE CONJUNTO DE DATOS:", i);


      
      //axios.get('https://datosabiertos.gob.ec/api/3/action/package_show?id=adur_district_spending
    };

  })
  .catch(error => {
    console.error(error);
  });
