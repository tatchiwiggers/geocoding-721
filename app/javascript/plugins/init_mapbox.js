// aqui em cima temos nossos imports
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// PART 3 ======================================================
// FIT MAP TO MARKERS
const fitMapToMarkers = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.info_window);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
  });
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 5, duration: 5000 });
};

// PADDING => DISTANCIA DO MARKER DO LIMITE DO MAPA
// MAXZOOM => acredito que o a variação seja d e1 a 20 - olar doc
// DURATION => DURAÇÃO DO ZOOM - TESTAR COM 5000 

// END PART 3 ======================================================

// PART 1 ======================================================
// declaramos nossa func initmapbox que busca o element map by id
const initMapbox = () => {
  // guarda esse valor nessa var mapelement
  const mapElement = document.getElementById('map');

  // aqui nos verificamos se realmente existe um div#map na pagina
  // se existir esse div#map ele vai construir o mapa e injetar na pagina - como?
  if (mapElement) {
    // vamos pegar o access token, que é nossa chave de api
    // que conseguimos pegar por esse comando aqui se lembram, la no console? fazer de novo.
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    // e vamos criar um novo mapa pelo mapbox
    // esse codigo está na documentação do mapbox ok?
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb'
    });
    // END PART 1 ======================================================
    
    // SLIDE JAVASCRIPT (2)
    // PART 2 ======================================================
    // aqui nos pegamos nossos markers, transformamos novamente
    // em um array de hashes, e para cada marker que eu tenho
    // eu quero adicionar esse marker no meu mapbox
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      new mapboxgl.Marker()
      // pra cada lat e long de cada flat que eu tenho
        .setLngLat([ marker.lng, marker.lat ])
        // eu coloco um marker dentro do meu mapa
        .addTo(map);
    });

    // END PART 2 ======================================================

    // PART 3 CHAMAR A FUNÇÃO
    // e aqui no final, apos fazer o mapa e os markers eu chamo essa função
    fitMapToMarkers(map, markers);
    // END PART 3

    // adds search bar on our map
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));
  }
};

export { initMapbox };

// LEMBRAR DE RESTART SERVER!
// LEMBRAR DE COLCOAR AS FUNCS NOS ESCOPOS CORRETOS - MUITOS {, ( e ; espalhados por ai....