(function () {
  const heroPhotos = [
    'https://lh3.googleusercontent.com/d/1ZZzHqNn0-90cNR0d6lDv09qY98NsM2tX',
  ];
  const heroImage = document.getElementById('hero-phtto');
  if (!heroImage || heroPhotos.length === 0) {
    return;
  }
  let currentIndex = 0;
  const fadePhoto = (nextSrc) => {
    heroImage.style.opacity = '0';
    heroImage.style.transition = 'opacity 0.7s ease';

    window.setTimeout(() => {
      heroImage.src = nextSrc;
      heroImage.alt = 'Jude Uloko Ngbede';
      heroImage.style.opacity = '1';
    }, 350);
  };
  const updateHeroPhoto = () => {
    currentIndex = (currentIndex + 1) % heroPhotos.length;
    fadePhoto(heroPhotos[currentIndex]);
  };
  heroImage.src = heroPhotos[0];
  heroImage.alt = 'Jude Uloko Ngbede';
  heroImage.style.transition = 'opacity 0.7s ease';
  heroImage.style.opacity = '1';
  if (heroPhotos.length > 1) {
    window.setInterval(updateHeroPhoto, 3000);
  }
})();
