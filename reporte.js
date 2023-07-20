const fs = require('fs');
const axios = require('axios');
const excel = require('exceljs');

async function obtenerConjuntosDeDatos() {
  try {
    const response = await axios.get('https://datosabiertos.gob.ec/api/3/action/package_list');
    const lista = response.data.result;
    return lista;
  } catch (error) {
    console.error("Error al obtener la lista de conjuntos de datos:", error.message);
    throw error;
  }
}

async function obtenerDatosConjunto(urlConjuntoDatos) {
  try {
    const response = await axios.get(urlConjuntoDatos);
    return response.data.result;
  } catch (error) {
    console.error("Error al obtener datos del conjunto:", error.message);
    throw error;
  }
}

async function imprimir() {
  try {
    const lista = await obtenerConjuntosDeDatos();
    let sumaTotalRecursos = 0;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    worksheet.columns = [
      { header: 'Título', key: 'title' },
      { header: 'Nombre', key: 'name' },
      { header: 'Organización', key: 'organization' },
      { header: 'Fecha creación', key: 'created' },
      { header: 'Fecha modificación', key: 'modified' },
      { header: 'Num Recursos', key: 'num_resources' },
      { header: 'URL Recurso', key: 'url' },
      { header: 'Tamaño Recurso', key: 'size' },
    ];

    for (let i = 0; i < lista.length; i++) {
      const urlConjuntoDatos = 'https://datosabiertos.gob.ec/api/3/action/package_show?id=' + lista[i];
      try {
        const datosConjunto = await obtenerDatosConjunto(urlConjuntoDatos);
        const row = {
          title: datosConjunto.title,
          name: datosConjunto.name,
          organization: datosConjunto.organization.title,
          created: datosConjunto.metadata_created,
          modified: datosConjunto.metadata_modified,
          num_resources: datosConjunto.num_resources,
          url: '', 
          size: '', 
        };

        if (datosConjunto.resources && datosConjunto.resources.length > 0) {
          for (let j = 0; j < datosConjunto.resources.length; j++) {
            const recurso = datosConjunto.resources[j];
            // Check if the resource has a URL
            if (recurso.url) {
              row.url += recurso.url + '\n';
            } else {
              row.url += 'Sin URL\n';
            }

            // Verifica si el recurso tiene tamaño
            if (recurso.size) {
              row.size += recurso.size + '\n';
            } else {
              row.size += 'Sin tamaño\n';
            }
          }
        } else {
          // Si no hay recursos se muestra un mensaje
          row.url = 'Sin recursos';
          row.size = 'Sin recursos';
        }

        worksheet.addRow(row);
        imprimirDatos(i + 1, datosConjunto);

        sumaTotalRecursos += datosConjunto.num_resources;
      } catch (error) {
        continue;
      }
    }

    console.log('Suma total de recursos:', sumaTotalRecursos);

    workbook.xlsx.writeFile('data.xlsx')
      .then(() => {
        console.log('Generado correctamente');
      })
      .catch((err) => {
        console.error('Error al guardar en Excel:', err.message);
      });

  } catch (error) {
    console.error("Error en la impresión:", error.message);
  }
}

function imprimirDatos(index, datos) {
  console.log(index, datos.title);
  console.log(datos.name);
  console.log(datos.organization.title);
  console.log(datos.metadata_created);
  console.log(datos.metadata_modified);
  console.log(datos.num_resources);

  if (datos.resources && datos.resources.length > 0) {
    for (let j = 0; j < datos.resources.length; j++) {
      const recurso = datos.resources[j];
      console.log(`Recurso ${j + 1}:`);
      console.log('URL Recurso:', recurso.url);
      console.log('Tamaño Recurso:', recurso.size);
    }
  } else {
    console.log('Recursos no disponibles');
  }
}

imprimir();
