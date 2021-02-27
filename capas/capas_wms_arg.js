var capas_wms_arg = {
  "asenthum":{ /* Funciona */
    "name":"Asentamientos Humanos de la República Argentina (BAHRA)",
    "getmap":"https://wms.ign.gob.ar/geoserver/idera/bahra/ows?SERVICE=WMS&",
    "getcap":"https://wms.ign.gob.ar/geoserver/idera/bahra/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
  },
  /* "indec":{ // No funciona no se porque en la Pagina
    "name":"Instituto Nacional de Estadística y Censos (INDEC)",
    "getmap":"https://geoservicios.indec.gob.ar/geoserver/ows?SERVICE=WMS&",
    "getcap":"https://geoservicios.indec.gob.ar/geoserver/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
    //"https://geoservicios.indec.gob.ar/geoserver/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
  },
  "inta":{ // Funciona pero no caraga capas (en QGIS tampoco)
    "name": "Instituto Nacional de Tecnología Agropecuaria (INTA)",
    "getmap":"http://geointa.inta.gov.ar:80/geoserver/ows?SERVICE=WMS&",
    "getcap":"http://geointa.inta.gov.ar:80/geoserver/ows?SERVICE=WMS&request=GetCapabilities"
  },
  "invglaciares":{
    // No funcionan en la pagina pero si en QGIS
    "name": "Inventario Nacional de Glaciares",
    "getmap":"http://maping.glaciaresargentinos.gob.ar/geoserver/ows?SERVICE=WMS&",
    "getcap":"http://maping.glaciaresargentinos.gob.ar/geoserver/ows?SERVICE=WMS&request=GetCapabilities"
  }, */
  "minagro":{ /* Funciona */
    "name":"Ministerio de Agricultura, Ganadería y Pesca - Secretaría de Agroindustria",
    "getcap":"https://geoserver.agroindustria.gob.ar/geoserver/ows?service=wms&version=1.1.1&request=GetCapabilities",
    "getmap":"https://geoadmin.agroindustria.gob.ar/geoserver/ows?SERVICE=WMS&"
  },
  "minamb":{ /* FUNCIONA! */
    "name":"Ministerio de Ambiente y Desarrollo Sostenible",
    "getmap":"https://geo.ambiente.gob.ar/geoserver/wms?SERVICE=WMS&",
    "getcap":"https://geo.ambiente.gob.ar/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities"
  },
  "mineducacion":{ /* Funciona */
    "name":"Ministerio de Educación",
    "getmap":"http://mapa.educacion.gob.ar/geoserver/ows?SERVICE=WMS&",
    "getcap":"http://mapa.educacion.gob.ar/geoserver/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
  } /*,
  "obraspublicas":{ // NO Funciona
    "name":"Ministerio de Obras Públicas",
    "getmap":"https://sig.planificacion.gob.ar/layers/public_wxs/?SERVICE=WMS",
    "getcap":"https://sig.planificacion.gob.ar/layers/public_wxs/?SERVICE=WMS&REQUEST=GetCapabilities"
    // ATENTIII... ACA HAY QUE BAJAR UN Children mas en layer (como en NASA)
  },
  "mintransporte":{ // NO Funciona
    "name":"Ministerio de Transporte",
    "getmap":"http://ide.transporte.gob.ar:80/geoserver/ows?service=wms&",
    "getcap":"http://ide.transporte.gob.ar:80/geoserver/ows?service=wms&request=GetCapabilities"
  },
  "senasa":{ // NO Funciona
    "name":"Servicio Nacional de Sanidad y Calidad Agroalimentaria (SENASA)",
    "getmap": "https://geonode.senasa.gob.ar/geoserver/ows?SERVICE=WMS&",
    "getcap": "https://geonode.senasa.gob.ar/geoserver/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
  },
  "minenergia":{ // NO Funciona
    "name":"Secretaría de Gobierno de Energía",
    "getmap":"http://sig.se.gob.ar/cgi-bin/mapserv6?map=/var/www/html/visor/geofiles/map/mapase.map&",
    "getcap":"http://sig.se.gob.ar/wmsenergia?service=wms&request=GetCapabilities"
  },
  "sedronar":{ // NO Funciona
    "name":"Secretaría de Políticas Integrales sobre Drogas de la Nación Argentina (SEDRONAR)",
    "getmap": "http://ide.sedronar.gov.ar/geoserver/ows?SERVICE=WMS&",
    "getcap":"http://ide.sedronar.gov.ar/geoserver/ows?SERVICE=WMS&version=1.3.0&request=GetCapabilities"
  },
  "servminero":{ // NO Funciona
    "name":"Servicio Geológico Minero Argentino (SEGEMAR)",
    "getmap":"https://sigam.segemar.gov.ar/geoserver/Peligro250K/ows?SERVICE=WMS&",
    "getcap":"https://sigam.segemar.gov.ar/geoserver/Peligro250K/wms?SERVICE=WMS&REQUEST=GetCapabilities"
  }
  */
};
