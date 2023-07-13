 //Uso de api de datos abiertos
 const axios = require('axios');

axios.get('https://datosabiertos.gob.ec/api/3/action/package_list')
  .then(response => {
    let listadataset = response.data.result;
        for (i = 0; i < listadataset.length; i++) {
          console.log(i+1, listadataset[i]);
                  };
        console.log("TOTAL DE CONJUTOS DE DATOS:" + i);


  })
  .catch(error => {
    console.error(error);
  });