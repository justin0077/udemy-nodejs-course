/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoianVzdGluMDA3NyIsImEiOiJjbGhnZDdkNHIwNDJkM3BsdW96b2gzZjh0In0.ZaysfEDv27r3uug1-WiVQw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:
      'mapbox://styles/justin0077/clhj3laet01l401p6hjcd7nwp', // style URL
    center: [-118.113491, 34.111745],
    zoom: 7,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(
        `<p>Day ${loc.day}: ${loc.description}</p>`
      )
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
