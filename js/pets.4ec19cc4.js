/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/modules/header.js
function header() {
  const body = document.body;
  const header = document.querySelector('.header');
  const headerBurger = document.querySelector('.header__burger');
  const headerNav = document.querySelector('.header__nav');
  const headerList = document.querySelector('.header__list');
  const animationDuration = 300;
  let isLocked = false;
  header.addEventListener('click', e => {
    const el = e.target;
    if (!el.closest('.header__nav') && !el.closest('.header__burger') && header.classList.contains('header--active')) {
      console.log('yes 1');
      closeHeaderBurger();
    }
    if (el.closest('.header__item') && header.classList.contains('header--active')) {
      console.log('yes');
      closeHeaderBurger();
    }
    if (el.closest('.header__burger')) {
      if (header.classList.contains('header--active')) {
        closeHeaderBurger();
      } else {
        openHeaderBurger();
      }
    }
  });
  function openHeaderBurger() {
    if (!isLocked) {
      body.classList.add('lock');
      header.classList.add('header--active');
      headerBurger.classList.add('header__burger--active');
      headerNav.animate([{
        transform: 'translateX(320px)'
      }, {
        transform: 'translateX(0px)'
      }], {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards'
      });
      isLocked = true;
      setTimeout(() => {
        isLocked = false;
      }, animationDuration);
    }
  }
  function closeHeaderBurger() {
    if (!isLocked) {
      const animation = headerNav.animate([{
        transform: 'translateX(0px)'
      }, {
        transform: 'translateX(320px)'
      }], {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards'
      });
      headerBurger.classList.remove('header__burger--active');
      body.classList.remove('lock');
      animation.addEventListener('finish', e => {
        header.classList.remove('header--active');
      });
      isLocked = true;
      setTimeout(() => {
        isLocked = false;
      }, animationDuration);
    }
  }
}
/* harmony default export */ const modules_header = (header);
;// ./src/js/data/pets.json
const pets_namespaceObject = /*#__PURE__*/JSON.parse('[{"name":"Jennifer","img":"../../assets/images/jennifer.png","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"name":"Sophia","img":"../../assets/images/sophia.png","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"name":"Woody","img":"../../assets/images/woody.png","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"name":"Scarlett","img":"../../assets/images/scarlett.png","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"name":"Katrine","img":"../../assets/images/katrine.png","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"name":"Timmy","img":"../../assets/images/timmy.png","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"name":"Freddie","img":"../../assets/images/freddie.png","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]},{"name":"Charly","img":"../../assets/images/charly.png","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]}]');
;// ./src/js/modules/commonUsefulFunctions.js
function createCardElement(obj, imgRulesObj) {
  const {
    name
  } = obj;
  const {
    baseForSrc,
    loading
  } = imgRulesObj;
  const cardEl = createHTMLElement({
    tag: 'div',
    classes: ['card']
  });
  const imgEl = createHTMLElement({
    tag: 'img',
    classes: ['card__img'],
    img: `${name.toLowerCase()}`,
    imgWidth: 270,
    imgHeight: 270,
    loading: loading,
    baseForSrc: baseForSrc
  });
  const titleEl = createHTMLElement({
    tag: 'h3',
    classes: ['card__title'],
    text: name
  });
  const btnEl = createHTMLElement({
    tag: 'button',
    classes: ['card__btn', 'btn', 'btn--card'],
    text: 'Learn more'
  });
  cardEl.append(imgEl);
  cardEl.append(titleEl);
  cardEl.append(btnEl);
  return cardEl;
}
function createHTMLElement(options) {
  const {
    tag = 'div',
    classes = [],
    text = '',
    img = '',
    loading = '',
    imgWidth = '',
    imgHeight = '',
    baseForSrc = ''
  } = options;
  const element = document.createElement(tag);
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  if (text) {
    element.textContent = text;
  }
  if (img) {
    const pictureEl = document.createElement('picture');
    const imgWebp = document.createElement('source');
    const imgAvif = document.createElement('source');
    imgAvif.srcset = `${baseForSrc}assets/images/pets-${img}.avif`;
    imgAvif.type = `image/avif`;
    imgWebp.srcset = `${baseForSrc}assets/images/pets-${img}.webp`;
    imgWebp.type = `image/webp`;
    element.src = `${baseForSrc}assets/images/pets-${img}.png`;
    element.width = imgWidth;
    element.height = imgHeight;
    element.alt = `Pets Img`;
    if (loading) {
      element.loading = `${loading}`;
    }
    pictureEl.append(imgAvif);
    pictureEl.append(imgWebp);
    pictureEl.append(element);
    return pictureEl;
  }
  return element;
}
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    const temporary = arr[i];
    arr[i] = arr[random];
    arr[random] = temporary;
  }
  return arr;
}

;// ./src/js/modules/modal.js


function modal(basePathForSrc) {
  const bodyEl = document.body;
  const modalContainer = document.querySelector('.modal-container');
  const animationDuration = 500;
  modalContainer.addEventListener('click', e => {
    const el = e.target;
    const elCardParent = el.closest('.card');
    if (elCardParent) {
      const petName = elCardParent.querySelector('.card__title').textContent;
      pets_namespaceObject.forEach(item => {
        if (item.name === petName) {
          showModal(item);
        }
      });
    }
  });
  function createModal(obj) {
    const petName = obj.name;
    const breedInfo = `${obj.type} - ${obj.breed}`;
    const descrInfo = obj.description;
    const ageInfo = obj.age;
    const parasitesInfo = obj.parasites.join(', ');
    const inoculationsInfo = obj.inoculations.join(', ');
    const diseasesInfo = obj.diseases.join(', ');
    const modalEl = createHTMLElement({
      tag: 'div',
      classes: ['modal']
    });
    const modalInnerEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__inner']
    });
    const modalCloseEl = createHTMLElement({
      tag: 'button',
      classes: ['modal__close', 'btn', 'btn--card']
    });
    const modalCloseSpanOneEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__close-span']
    });
    const modalCloseSpanTwoEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__close-span']
    });
    modalCloseEl.append(modalCloseSpanOneEl);
    modalCloseEl.append(modalCloseSpanTwoEl);
    const modalInfoEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__info']
    });
    const imgBlockEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__img-block']
    });
    const imgEl = createHTMLElement({
      tag: 'img',
      classes: ['modal__img'],
      img: `${petName.toLowerCase()}`,
      imgWidth: 500,
      imgHeight: 500,
      baseForSrc: basePathForSrc
    });
    imgBlockEl.append(imgEl);
    const titleEl = createHTMLElement({
      tag: 'h2',
      classes: ['modal__title'],
      text: `${petName}`
    });
    const subtitleEl = createHTMLElement({
      tag: 'h3',
      classes: ['modal__subtitle'],
      text: `${breedInfo}`
    });
    const descrEl = createHTMLElement({
      tag: 'p',
      classes: ['modal__descr'],
      text: `${descrInfo}`
    });
    const petInfoList = createHTMLElement({
      tag: 'ul',
      classes: ['modal__list']
    });
    const ageInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${ageInfo}`
    });
    const parasitesInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${parasitesInfo}`
    });
    const inoculationsInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${inoculationsInfo}`
    });
    const diseasesInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${diseasesInfo}`
    });
    const ageSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Age: `
    });
    const parasitesSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Parasites: `
    });
    const inoculationsSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Inoculations: `
    });
    const diseasesSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Diseases: `
    });
    ageInfoEl.prepend(ageSpanEl);
    inoculationsInfoEl.prepend(inoculationsSpanEl);
    parasitesInfoEl.prepend(parasitesSpanEl);
    diseasesInfoEl.prepend(diseasesSpanEl);
    petInfoList.append(ageInfoEl);
    petInfoList.append(inoculationsInfoEl);
    petInfoList.append(diseasesInfoEl);
    petInfoList.append(parasitesInfoEl);
    modalEl.append(modalInnerEl);
    modalInnerEl.append(imgBlockEl);
    modalInnerEl.append(modalInfoEl);
    modalInnerEl.append(modalCloseEl);
    modalInfoEl.append(titleEl);
    modalInfoEl.append(subtitleEl);
    modalInfoEl.append(descrEl);
    modalInfoEl.append(petInfoList);
    return modalEl;
  }
  function showModal(obj) {
    const modalEl = createModal(obj);
    bodyEl.append(modalEl);
    bodyEl.classList.add('lock');
    modalEl.animate([{
      opacity: 0
    }, {
      opacity: 1
    }], {
      duration: animationDuration,
      fill: 'forwards'
    });
    modalEl.addEventListener('click', e => {
      const el = e.target;
      if (!el.closest('.modal__inner') || el.closest('.modal__close')) {
        closeModal();
      }
    });
  }
  function closeModal() {
    const modalEl = document.querySelector('.modal');
    const animation = modalEl.animate([{
      opacity: 1
    }, {
      opacity: 0
    }], {
      duration: animationDuration,
      fill: 'forwards'
    });
    animation.addEventListener('finish', () => {
      bodyEl.classList.remove('lock');
      bodyEl.removeChild(modalEl);
    });
  }
}
/* harmony default export */ const modules_modal = (modal);
;// ./src/js/modules/tabs.js


function tabs() {
  const ourFriendsInnerEl = document.querySelector('.our-friends__inner');
  const nextPageEl = document.querySelector('.our-friends__control--next');
  const lastPageEl = document.querySelector('.our-friends__control--last');
  const prevPageEl = document.querySelector('.our-friends__control--prev');
  const firstPageEl = document.querySelector('.our-friends__control--first');
  const currentPageEl = document.querySelector('.our-friends__control--current-page ');
  const randomPetsArr = [];
  let petsPerPage = 8;
  let currentPage = 1;
  while (randomPetsArr.length < 48) {
    const firstHalf = pets_namespaceObject.slice(0, Math.floor(pets_namespaceObject.length / 2));
    const secondHalf = pets_namespaceObject.slice(Math.floor(pets_namespaceObject.length / 2), pets_namespaceObject.length);
    const firstRandomArr = shuffleArr(firstHalf);
    const secondRandomArr = shuffleArr(secondHalf);
    randomPetsArr.push(...firstRandomArr);
    randomPetsArr.push(...secondRandomArr);
  }
  const width = window.innerWidth;
  currentPage = 1;
  if (width > 1280) {
    petsPerPage = 8;
    firstPageEl.click();
  }
  if (width < 1280 && width > 768) {
    petsPerPage = 6;
    firstPageEl.click();
  }
  if (width < 768) {
    petsPerPage = 4;
    firstPageEl.click();
  }
  function showPetsInner() {
    ourFriendsInnerEl.textContent = '';
    const to = currentPage * petsPerPage;
    const from = to - petsPerPage;
    const currentPageArr = randomPetsArr.slice(from, to);
    currentPageArr.forEach(item => {
      const petItem = createCardElement(item, {
        baseForSrc: '../',
        loading: ''
      });
      ourFriendsInnerEl.append(petItem);
    });
  }
  showPetsInner();
  function showNextPage() {
    currentPage += 1;
    const lastPageCount = randomPetsArr.length / petsPerPage;
    if (lastPageCount >= currentPage) {
      currentPageEl.textContent = currentPage;
      firstPageEl.classList.remove('our-friends__control--disabled');
      prevPageEl.classList.remove('our-friends__control--disabled');
      showPetsInner();
    }
    if (currentPage * petsPerPage === randomPetsArr.length) {
      nextPageEl.classList.add('our-friends__control--disabled');
      lastPageEl.classList.add('our-friends__control--disabled');
    }
  }
  function showPrevPage() {
    currentPage -= 1;
    if (currentPage >= 1) {
      currentPageEl.textContent = currentPage;
      nextPageEl.classList.remove('our-friends__control--disabled');
      lastPageEl.classList.remove('our-friends__control--disabled');
      showPetsInner();
    }
    if (currentPage === 1) {
      prevPageEl.classList.add('our-friends__control--disabled');
      firstPageEl.classList.add('our-friends__control--disabled');
    }
  }
  nextPageEl.addEventListener('click', showNextPage);
  lastPageEl.addEventListener('click', () => {
    currentPage = randomPetsArr.length / petsPerPage - 1;
    showNextPage();
  });
  prevPageEl.addEventListener('click', showPrevPage);
  firstPageEl.addEventListener('click', () => {
    currentPage = 2;
    showPrevPage();
  });
  function resizeTabsInner() {
    const width = window.innerWidth;
    currentPage = 1;
    if (width > 1280) {
      petsPerPage = 8;
      firstPageEl.click();
    }
    if (width < 1280 && width > 768) {
      petsPerPage = 6;
      firstPageEl.click();
    }
    if (width < 768) {
      petsPerPage = 4;
      firstPageEl.click();
    }
  }
  let resizeEndTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeEndTimeout);
    resizeEndTimeout = setTimeout(resizeTabsInner, 100);
  });
}
/* harmony default export */ const modules_tabs = (tabs);
;// ./src/js/pets.js



modules_header();
modules_modal('../');
modules_tabs();
/******/ })()
;