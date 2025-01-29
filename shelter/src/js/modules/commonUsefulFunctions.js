function createCardElement(obj, imgRulesObj) {
  const { name } = obj;
  const { baseForSrc, loading } = imgRulesObj;

  const cardEl = createHTMLElement({ tag: 'div', classes: ['card'] });

  const imgEl = createHTMLElement({
    tag: 'img',
    classes: ['card__img'],
    img: `${name.toLowerCase()}`,
    imgWidth: 270,
    imgHeight: 270,
    loading: loading,
    baseForSrc: baseForSrc,
  });

  const titleEl = createHTMLElement({
    tag: 'h3',
    classes: ['card__title'],
    text: name,
  });

  const btnEl = createHTMLElement({
    tag: 'button',
    classes: ['card__btn', 'btn', 'btn--card'],
    text: 'Learn more',
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
    baseForSrc = '',
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

export { createCardElement, getRandomNumber, createHTMLElement, shuffleArr };
