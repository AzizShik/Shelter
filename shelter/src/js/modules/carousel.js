import petsData from '../data/pets.json';
import { createCardElement, getRandomNumber } from './commonUsefulFunctions';

function carousel() {
  const carouselNextBtn = document.querySelector('.our-friends__control--next');
  const carouselPrevBtn = document.querySelector('.our-friends__control--prev');
  const carouselInner = document.querySelector('.our-friends__inner');

  const carouselAnimationDuration = 300;

  let carouselInnerArr = [];
  let itemsPerPage = 3;
  let isNextClickedTwice = false;
  let isPrevClickedTwice = false;
  let isLocked = false;

  function getRandomPetsArrPerPage() {
    const randomPetsArr = [];
    while (randomPetsArr.length < itemsPerPage) {
      const randomPet = petsData[getRandomNumber(0, petsData.length - 1)];
      let isUnique;

      if (randomPetsArr.length > 0) {
        const randomPetUnique = !randomPetsArr.some((item) => {
          return item.name == randomPet.name;
        });

        const isCarouselArrUnique = !carouselInnerArr.some((item) => {
          return item.name == randomPet.name;
        });

        isUnique = randomPetUnique && isCarouselArrUnique;
      } else {
        isUnique = true;
      }

      const isCarouselArrUnique = !carouselInnerArr.some((item) => {
        return item.name == randomPet.name;
      });

      if (isUnique && isCarouselArrUnique) {
        randomPetsArr.push(randomPet);
      }
    }

    return randomPetsArr;
  }

  function initialCarouselLoad() {
    carouselInner.textContent = '';

    carouselInnerArr = [...getRandomPetsArrPerPage()];

    carouselInnerArr.forEach((item) => {
      const cardEl = createCardElement(item);

      carouselInner.append(cardEl);
    });
  }

  initialCarouselLoad();

  function showNextSlide() {
    if (carouselInnerArr.length < 6) {
      carouselInnerArr.push(...getRandomPetsArrPerPage());
    }

    if (!isLocked) {
      isLocked = true;

      if (isNextClickedTwice) {
        const length = carouselInnerArr.length;
        const secondHalf = carouselInnerArr.slice(
          Math.ceil(length / 2),
          length,
        );

        carouselInnerArr = [];

        carouselInnerArr.push(...secondHalf);
        carouselInnerArr.push(...getRandomPetsArrPerPage());
      }

      isNextClickedTwice = true;
      isPrevClickedTwice = false;

      const length = carouselInnerArr.length;
      const secondHalf = carouselInnerArr.slice(Math.ceil(length / 2), length);

      const carouselAnimation = carouselInner.animate(
        [
          { transform: 'translateX(0%)', opacity: '1' },
          { transform: 'translateX(-20%)', opacity: '0' },
        ],
        {
          duration: carouselAnimationDuration,
          fill: 'forwards',
        },
      );

      carouselAnimation.addEventListener('finish', () => {
        carouselInner.textContent = '';

        secondHalf.forEach((item) => {
          const cardEl = createCardElement(item);

          carouselInner.append(cardEl);
        });

        const carouselAnimation = carouselInner.animate(
          [
            { transform: 'translateX(20%)', opacity: '0' },
            { transform: 'translateX(0%)', opacity: '1' },
          ],
          {
            duration: 300,
            fill: 'forwards',
          },
        );
      });

      setTimeout(() => {
        isLocked = false;
      }, carouselAnimationDuration);
    }
  }

  function showPrevSlide() {
    if (carouselInnerArr.length < 6) {
      carouselInnerArr.unshift(...getRandomPetsArrPerPage());
    }

    if (!isLocked) {
      isLocked = true;

      if (isPrevClickedTwice) {
        const length = carouselInnerArr.length;
        const firstHalf = carouselInnerArr.slice(0, Math.ceil(length / 2));

        carouselInnerArr = [];

        carouselInnerArr.push(...firstHalf);
        carouselInnerArr.unshift(...getRandomPetsArrPerPage());
      }

      isNextClickedTwice = false;
      isPrevClickedTwice = true;

      const length = carouselInnerArr.length;
      const firstHalf = carouselInnerArr.slice(0, Math.ceil(length / 2));

      const carouselAnimation = carouselInner.animate(
        [
          { transform: 'translateX(0%)', opacity: '1' },
          { transform: 'translateX(20%)', opacity: '0' },
        ],
        {
          duration: carouselAnimationDuration,
          fill: 'forwards',
        },
      );

      carouselAnimation.addEventListener('finish', () => {
        carouselInner.textContent = '';

        firstHalf.forEach((item) => {
          const cardEl = createCardElement(item);
          carouselInner.append(cardEl);
        });

        const carouselAnimation = carouselInner.animate(
          [
            { transform: 'translateX(-20%)', opacity: '0' },
            { transform: 'translateX(0%)', opacity: '1' },
          ],
          {
            duration: 300,
            fill: 'forwards',
          },
        );
      });

      setTimeout(() => {
        isLocked = false;
      }, carouselAnimationDuration);
    }
  }

  carouselNextBtn.addEventListener('click', showNextSlide);
  carouselPrevBtn.addEventListener('click', showPrevSlide);
}

export default carousel;
