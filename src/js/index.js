
import moment from 'moment';
import '../sass/main.scss';
import {
  addDataToStorage,
  getSelector,
  getAddress,
  getValue,
  validateFields,
  loadDataFromStorage,
  filterByCoords,
  filterCoordsByProperties,
  balloonTemplate,
  placemarkTemplate,
  clustererTemplate
} from './helper';

let map;
let coords;
let balloon;

const init = () => {
  map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 12,
    controls: [
      'zoomControl'
    ]
  });

  const placemarkClickHandler = (e) => {
    coords = e.originalEvent.target.properties.get('coords');
    balloon.close();
  };

  const addSubmitListener = () => {
    document.querySelector('.form__button').addEventListener('click', submitHandler);
  };

  const removeSubmitListener = () => {
    document.querySelector('.form__button').removeEventListener('click', submitHandler);
  };

  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    balloonTemplate, {

    build: function () {
      BalloonContentLayout.superclass.build.call(this);
      addSubmitListener();
    },

    clear: function () {
      removeSubmitListener();
      BalloonContentLayout.superclass.clear.call(this);
    }
  });

  const PmContentLayout = ymaps.templateLayoutFactory.createClass(
    placemarkTemplate, {

    build: function () {
      PmContentLayout.superclass.build.call(this);
      addSubmitListener();
    },

    clear: function () {
      removeSubmitListener();
      PmContentLayout.superclass.clear.call(this);
    }
  });

  const clickHandler = async (e) => {
    e.preventDefault();

    map.balloon.close();

    if (!balloon.isOpen()) {
      coords = e.get('coords');

      const address = await getAddress(coords);

      balloon.options.set({
        address: address
      });

      balloon.open(coords);
    }
    else {
      balloon.close();
    }
  };

  map.events.add('click', clickHandler);

  const createNewPlacemark = (data, template) => {
    let placemark = new ymaps.Placemark(data.coords, {
      address: data.address,
      coords: data.coords,
      filteredData: filterByCoords(loadDataFromStorage(), data.coords)
    }, {
      balloonContentLayout: template
    });

    placemark.events.add('click', placemarkClickHandler);

    return placemark;
  };

  balloon = new ymaps.Balloon(map);
  balloon.options.setParent(map.options);
  balloon.options.set({
    contentLayout: BalloonContentLayout,
    panelMaxMapArea: 0,

    contentLayoutHeight: 600
  });

  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: ymaps.templateLayoutFactory.createClass(clustererTemplate),
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 300,
    clusterBalloonContentLayoutHeight: 130,
    clusterBalloonPagerSize: 5
  });

  let placemarks = [];
  const dataFromStorage = loadDataFromStorage();

  dataFromStorage.forEach(item => {
    const filteredData = filterCoordsByProperties(placemarks, item.coords);

    if (filteredData.length === 0) {
      placemarks.push(createNewPlacemark(item, PmContentLayout));
    } else {
      filteredData[0].properties.set({ filteredData: filterByCoords(loadDataFromStorage(), item.coords) });
    }
  });

  clusterer.add(placemarks);
  clusterer.events.add('click', () => balloon.close());
  map.geoObjects.add(clusterer);

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = getSelector('#name');
    const place = getSelector('#place');
    const comment = getSelector('#comment');
    const address = await getAddress(coords);
    const date = moment().format('L');

    if (!validateFields([name, place, comment])) {
      return;
    }

    const data = {
      coords: coords,
      name: getValue(name),
      place: getValue(place),
      comment: getValue(comment),
      address: address,
      date: date
    };

    const filteredData = filterByCoords(loadDataFromStorage(), coords);
    addDataToStorage(data);

    if (filteredData.length === 0) {
      clusterer.add(createNewPlacemark(data, PmContentLayout));

      balloon.close();
    } else {
      let itemPm = filterCoordsByProperties(clusterer.getGeoObjects(), coords);
      itemPm[0].properties.set({ filteredData: filterByCoords(loadDataFromStorage(), coords) });

      map.balloon.close();
    }
  };

  const onBalloonLinkClick = (e) => {
    const { id } = e.target;

    if (id && id === 'modal__address--link') {
      e.preventDefault();

      map.balloon.close();

      /*let itemPm = clusterer.getGeoObjects().filter(item => (item.properties.get('address')) === (e.target.innerText))
        itemPm[0].balloon.open(); */
    }
  };

  document.addEventListener('click', onBalloonLinkClick);
};

ymaps.ready(init);