function header() {
  const body = document.body;
  const header = document.querySelector('.header');
  const headerBurger = document.querySelector('.header__burger');
  const headerNav = document.querySelector('.header__nav');
  const headerList = document.querySelector('.header__list');

  const animationDuration = 300;

  header.addEventListener('click', (e) => {
    const el = e.target;
    if (
      !el.closest('.header__nav') &&
      !el.closest('.header__burger') &&
      header.classList.contains('header--active')
    ) {
      console.log('yes 1');
      closeHeaderBurger();
    }

    if (
      el.closest('.header__item') &&
      header.classList.contains('header--active')
    ) {
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
    body.classList.add('lock');
    header.classList.add('header--active');
    headerBurger.classList.add('header__burger--active');
    headerNav.animate(
      [{ transform: 'translateX(320px)' }, { transform: 'translateX(0px)' }],
      {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards',
      },
    );
  }

  function closeHeaderBurger() {
    const animation = headerNav.animate(
      [{ transform: 'translateX(0px)' }, { transform: 'translateX(320px)' }],
      {
        duration: animationDuration,
        iterations: 1,
        fill: 'forwards',
      },
    );

    headerBurger.classList.remove('header__burger--active');
    body.classList.remove('lock');

    animation.addEventListener('finish', (e) => {
      header.classList.remove('header--active');
    });
  }
}

export default header;
