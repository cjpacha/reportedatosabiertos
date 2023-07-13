//inicio de desarrollo 11 de julio de 2023.
// Maria Mendoza - Javier Pacha

const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    let listadataset = response.data.result;
        console.log(listadataset);

  })
  .catch(error => {
    console.error(error);
  });