export default class Map {
  constructor(mapId, onClick) {
    this.mapId = mapId;
    this.onClick = onClick;
  }

  async init() {
    await this.injectScript();
    await this.loadYMaps();
    this.initMap();
  }

  injectScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=23265c40-7e83-4018-b79c-affa080745c1&lang=ru_RU';
      document.body.appendChild(script);
      script.addEventListener('load', resolve);
    });
  }

  loadYMaps() {
    return new Promise(resolve => ymaps.ready(resolve));
  }

  initMap() {
    this.map = new ymaps.Map(this.mapId, {
      center: [55.76, 37.64],
      zoom: 12,
      controls: [
        'zoomControl'
      ]
    });

    this.clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: true,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 130,
      clusterBalloonPagerSize: 5
    });

    this.clusterer.events.add('click', (e) => this.onClick(e.get('target').geometry.getCoordinates(), true));

    this.map.geoObjects.add(this.clusterer);
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
  }

  openBalloon(coords, content) {
    this.map.balloon.open(coords, content);
  }

  closeBalloon() {
    this.map.balloon.close();
  }

  setBalloonContent(content) {
    this.map.balloon.setData(content);
  }

  setClusteredBalloonContent(content) {
    this.clusterer.options.set('clusterBalloonItemContentLayout',
      ymaps.templateLayoutFactory.createClass(content));
  }

  createPlacemark(data) {
    const placemark = new ymaps.Placemark(data.coords, data);

    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });

    this.clusterer.add(placemark);
  }

  getPlacemarks() {
    return this.clusterer.getGeoObjects();
  }
}