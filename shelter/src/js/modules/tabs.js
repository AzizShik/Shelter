import petsData from '../data/pets.json';
import { createCardElement, shuffleArr } from './commonUsefulFunctions';

function tabs() {
  const ourFriendsInnerEl = document.querySelector('.our-friends__inner');
  const nextPageEl = document.querySelector('.our-friends__control--next');
  const lastPageEl = document.querySelector('.our-friends__control--last');
  const prevPageEl = document.querySelector('.our-friends__control--prev');
  const firstPageEl = document.querySelector('.our-friends__control--first');
  const currentPageEl = document.querySelector(
    '.our-friends__control--current-page ',
  );

  const randomPetsArr = [];
  let petsPerPage = 8;
  let currentPage = 1;

  while (randomPetsArr.length < 48) {
    const randomArr = shuffleArr(petsData);

    randomPetsArr.push(...randomArr);
  }

  function showPetsInner() {
    ourFriendsInnerEl.textContent = '';

    const to = currentPage * petsPerPage;
    const from = to - petsPerPage;

    const currentPageArr = randomPetsArr.slice(from, to);

    currentPageArr.forEach((item) => {
      const petItem = createCardElement(item, {
        baseForSrc: '../',
        loading: '',
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
      console.log(currentPage);

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

    console.log(width);
    console.log(currentPage);

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

export default tabs;
