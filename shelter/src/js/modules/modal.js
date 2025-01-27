import petsArr from '../data/pets.json';
import { createHTMLElement } from './commonUsefulFunctions';

function modal(basePathForSrc) {
  const bodyEl = document.body;
  const modalContainer = document.querySelector('.modal-container');

  const animationDuration = 500;

  modalContainer.addEventListener('click', (e) => {
    const el = e.target;

    const elCardParent = el.closest('.card');

    if (elCardParent) {
      const petName = elCardParent.querySelector('.card__title').textContent;

      petsArr.forEach((item) => {
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
      classes: ['modal'],
    });

    const modalInnerEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__inner'],
    });

    const modalCloseEl = createHTMLElement({
      tag: 'button',
      classes: ['modal__close', 'btn', 'btn--card'],
    });

    const modalCloseSpanOneEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__close-span'],
    });

    const modalCloseSpanTwoEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__close-span'],
    });

    modalCloseEl.append(modalCloseSpanOneEl);
    modalCloseEl.append(modalCloseSpanTwoEl);

    const modalInfoEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__info'],
    });

    const imgBlockEl = createHTMLElement({
      tag: 'div',
      classes: ['modal__img-block'],
    });

    const imgEl = createHTMLElement({
      tag: 'img',
      classes: ['modal__img'],
      img: `${petName.toLowerCase()}`,
      imgWidth: 500,
      imgHeight: 500,
      baseForSrc: basePathForSrc,
    });

    imgBlockEl.append(imgEl);

    const titleEl = createHTMLElement({
      tag: 'h2',
      classes: ['modal__title'],
      text: `${petName}`,
    });

    const subtitleEl = createHTMLElement({
      tag: 'h3',
      classes: ['modal__subtitle'],
      text: `${breedInfo}`,
    });

    const descrEl = createHTMLElement({
      tag: 'p',
      classes: ['modal__descr'],
      text: `${descrInfo}`,
    });

    const petInfoList = createHTMLElement({
      tag: 'ul',
      classes: ['modal__list'],
    });

    const ageInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${ageInfo}`,
    });

    const parasitesInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${parasitesInfo}`,
    });

    const inoculationsInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${inoculationsInfo}`,
    });

    const diseasesInfoEl = createHTMLElement({
      tag: 'li',
      classes: ['modal__item'],
      text: `${diseasesInfo}`,
    });

    const ageSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Age: `,
    });

    const parasitesSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Parasites: `,
    });

    const inoculationsSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Inoculations: `,
    });

    const diseasesSpanEl = createHTMLElement({
      tag: 'span',
      classes: ['modal__item-span'],
      text: `Diseases: `,
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

    modalEl.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: animationDuration,
      fill: 'forwards',
    });

    modalEl.addEventListener('click', (e) => {
      const el = e.target;

      if (!el.closest('.modal__inner') || el.closest('.modal__close')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    const modalEl = document.querySelector('.modal');

    const animation = modalEl.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: animationDuration,
      fill: 'forwards',
    });

    animation.addEventListener('finish', () => {
      bodyEl.classList.remove('lock');
      bodyEl.removeChild(modalEl);
    });
  }
}

export default modal;
