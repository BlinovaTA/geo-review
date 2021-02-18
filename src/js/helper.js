const validateFields = (fieldsArray) => {
  let isValid = true;

  fieldsArray.forEach(field => {
    field.classList.remove('input-error');

    if (field.value.trim() === '') {
      field.classList.add('input-error');
      isValid = false;
    }
  });

  return isValid;
}

const getSelector = (id) => document.querySelector(id);

const getValue = (selector) => selector.value.trim();

const getAddress = (coords) => {
  return new Promise((resolve, reject) => {
    ymaps.geocode(coords)
      .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
      .catch(e => reject(e));
  });
};

const filterByCoords = (data, coords) => data.filter(item => JSON.stringify(item.coords) === JSON.stringify(coords));

const filterCoordsByProperties = (data, coords) => data.filter(item => JSON.stringify(item.properties.get('coords')) === JSON.stringify(coords));

const addDataToStorage = (newData) => {
  let markers = [];
  if (localStorage.getItem('markers')) {
    markers = JSON.parse(localStorage.getItem('markers'));
  }
  markers.push(newData);
  localStorage.setItem('markers', JSON.stringify(markers));
};

const loadDataFromStorage = () => {
  if (localStorage.getItem('markers')) {
    return JSON.parse(localStorage.getItem('markers'));
  }
};

const modal = document.querySelector('.modal').innerHTML;

const balloonTemplate = '<div class="reviews">' +
  '<div class="modal__address">{{options.address}}</div>' +
  '</div>' +
  modal;

const placemarkTemplate = '<div class="balloon">' +

  '<div class="reviews">' +
  '<div class="modal__address">{{properties.address}}</div>' +
  '<ul class="modal__list">' +

  '{% for item in properties.filteredData %}' +
  '<li class="modal__list-item">' +
  '<div><b>{{ item.name }}</b> <span class="modal__text">{{item.place}} {{item.date}}</span></div>' +
  '<div class="modal__text">{{item.comment}}</div>' +
  '</li>' +
  '{% endfor %}' +

  '</ul>' +
  '</div>' +

  modal +

  '</div>';

const clustererTemplate = '<ul class="modal__list modal__list--clusterer">' +
  '<a href="#" id="modal__address--link">{{properties.address}}</a>' +
  '{% for item in properties.filteredData %}' +

  '<li class="modal__list-item">' +
  '<div><b>{{ item.name }}</b> <span class="modal__text">{{item.place}} {{item.date}}</span></div>' +
  '<div class="modal__text">{{item.comment}}</div>' +
  '</li>' +

  '{% endfor %}' +
  '</ul>';

export {
  addDataToStorage,
  loadDataFromStorage,
  getSelector,
  getAddress,
  getValue,
  validateFields,
  filterByCoords,
  filterCoordsByProperties,
  balloonTemplate,
  placemarkTemplate,
  clustererTemplate
};