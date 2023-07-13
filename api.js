//inicio de desarrollo 11 de julio de 2023.
// Maria Mendoza - Javier Pacha

const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    
    let listadataset = response.data.result;
    
    for (i = 0; i < listadataset.length; i++) {
      // imprimir la lista de los nombres de los conjutos de datos numeradas
      console.log(i+1, listadataset[i]);
      
    };

    console.log("TOTAL DE CONJUNTO DE DATOS:", i);

  })
  .catch(error => {
    console.error(error);
  });
