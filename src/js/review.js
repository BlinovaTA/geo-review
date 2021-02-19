import dayjs from 'dayjs';
import Map from './map';

export default class Review {
  constructor() {
    this.map = new Map('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  onInit() {
    const dataFromStorage = this.getData();

    dataFromStorage.forEach(item => {
      const filteredData = this.filterCoordsByProperties(this.map.getPlacemarks(), item.coords);

      if (filteredData.length === 0) {
        this.map.createPlacemark(item);
      } else {
        filteredData[0].properties.set({ filteredData: this.filterByCoords(dataFromStorage, item.coords) });
      }
    });

    document.addEventListener('click', this.onFormClick.bind(this));
    document.addEventListener('keydown', this.onFormKeydown.bind(this));
  }

  onClick(coords, isClustered) {
    if (isClustered) {
      this.openClusteredBalloon();
    } else {
      this.openBalloon(coords);
    }
  }

  async openBalloon(coords) {
    let template = await this.getBalloonTemplate(coords);
    this.map.openBalloon(coords, template);
  }

  openClusteredBalloon() {
    let template = this.getClustererTemplate();
    this.map.setClusteredBalloonContent(template);
  }

  onFormKeydown(e) {
    if (e.keyCode == 27 && this.map.balloonIsOpen()) {
      this.map.closeBalloon();
    }
  }

  onFormClick(e) {
    let { className } = e.target;

    if (className === 'form__button') {
      this.submitClick();
    } else if (className === 'js-address-link') {
      this.linkClick(e);
    }
  }

  async submitClick() {
    const modalAddress = document.querySelector('.modal__address');
    const coords = JSON.parse(modalAddress.dataset.coords);

    const name = this.getSelector('#name');
    const place = this.getSelector('#place');
    const comment = this.getSelector('#comment');
    const address = await this.getAddress(coords);
    const date = dayjs().format('DD.MM.YYYY');

    if (!this.validateFields([name, place, comment])) {
      return;
    }

    const data = {
      coords: coords,
      name: this.getValue(name),
      place: this.getValue(place),
      comment: this.getValue(comment),
      address: address,
      date: date
    };

    const filteredData = this.filterByCoords(this.getData(), coords);

    if (filteredData.length === 0) {
      this.map.createPlacemark(data);
    }

    this.setData(data);
    this.map.closeBalloon();
  }

  linkClick(e) {
    e.preventDefault();

    this.map.closeBalloon();
    const coords = JSON.parse(e.target.dataset.coords);
    this.openBalloon(coords);
  }

  async getBalloonTemplate(coords) {
    const data = this.filterByCoords(this.getData(), coords);
    const address = await this.getAddress(coords);

    let balloonDiv = document.createElement('div');
    balloonDiv.className = 'balloon';

    let reviewsDiv = document.createElement('div');
    reviewsDiv.className = 'reviews';

    let addressDiv = document.createElement('div');
    addressDiv.className = 'modal__address';
    addressDiv.textContent = address;
    addressDiv.dataset.coords = JSON.stringify(coords);

    let ul = document.createElement('ul');
    ul.className = 'modal__list';

    data.forEach(item => {
      let liContent = this.getReviewItemTemplate(item);

      let li = document.createElement('li');
      li.className = 'modal__list-item';
      li.appendChild(liContent);

      ul.appendChild(li);
    });

    reviewsDiv.appendChild(addressDiv);

    if (data.length > 0) {
      reviewsDiv.appendChild(ul);
    }

    balloonDiv.appendChild(reviewsDiv);

    const modalBody = document.querySelector('#modal').innerHTML;

    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = modalBody;

    balloonDiv.appendChild(modal);

    return balloonDiv.innerHTML;
  }

  getClustererTemplate() {
    let clustererDiv = document.createElement('div');

    let address = document.createElement('a');
    address.href = '#';
    address.className = 'js-address-link';
    address.textContent = '{{properties.address}}';
    address.dataset.coords = '[{{properties.coords}}]';

    let liContent = this.getReviewItemTemplate({
      name: '{{properties.name}}',
      place: '{{properties.place}}',
      date: '{{properties.date}}',
      comment: '{{properties.comment}}'
    });

    clustererDiv.appendChild(address);
    clustererDiv.appendChild(liContent);

    return clustererDiv.innerHTML;
  }

  getReviewItemTemplate(item) {
    let liContent = document.createElement('div');

    let name = document.createElement('b');
    name.textContent = item.name;

    let placeAndDate = document.createElement('span');
    placeAndDate.className = 'modal__text';
    placeAndDate.textContent = ` ${item.place} ${item.date}`;

    let comment = document.createElement('div');
    comment.className = 'modal__text';
    comment.textContent = item.comment;

    liContent.appendChild(name);
    liContent.appendChild(placeAndDate);
    liContent.appendChild(comment);

    return liContent;
  }

  getData() {
    if (!localStorage.getItem('markers')) {
      this.createStorage();
    }

    return JSON.parse(localStorage.getItem('markers'));
  }

  setData(newData) {
    let markers = [];

    if (localStorage.getItem('markers')) {
      markers = JSON.parse(localStorage.getItem('markers'));
    }

    markers.push(newData);
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  createStorage() {
    localStorage.setItem('markers', '[]');
  }

  validateFields(fieldsArray) {
    let isValid = true;

    fieldsArray.forEach(field => {
      field.classList.remove('input-error');

      if (!this.isValid(field)) {
        field.classList.add('input-error');
        isValid = false;
      }
    });

    return isValid;
  }

  isValid(field) {
    return field.value.trim() !== '';
  }

  getSelector(id) {
    return document.querySelector(id);
  }

  getValue(selector) {
    return selector.value.trim();
  }

  getAddress(coords) {
    return new Promise((resolve, reject) => {
      ymaps.geocode(coords)
        .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
        .catch(e => reject(e));
    });
  }

  filterByCoords(data, coords) {
    return data.filter(item => JSON.stringify(item.coords) === JSON.stringify(coords));
  }

  filterCoordsByProperties(data, coords) {
    return data.filter(item => JSON.stringify(item.properties.get('coords')) === JSON.stringify(coords));
  }
}