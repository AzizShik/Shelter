export function getAllImagesDinamically() {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/),
  );

  return images;
}

const allImages = getAllImagesDinamically();

function createCardElement(obj) {
  const { name } = obj;

  const cardEl = createHTMLElement({ tag: 'div', classes: ['card'] });

  const imgEl = createHTMLElement({
    tag: 'img',
    classes: ['card__img'],
    img: `${name.toLowerCase()}`,
    loading: 'lazy',
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

    imgAvif.srcset = `assets/images/pets-${img}.avif`;
    imgAvif.type = `image/avif`;

    imgWebp.srcset = `assets/images/pets-${img}.webp`;
    imgWebp.type = `image/webp`;

    element.src = `assets/images/pets-${img}.png`;
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

export { createCardElement, getRandomNumber, createHTMLElement };
