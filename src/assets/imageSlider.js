export function initializeImageSlider() {
  if (typeof document === 'undefined') {
    console.warn('DOM is not available. Skipping initializeImageSlider.');
    return;
  }

  let currentIndex = 0;
  const images = [
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg'
  ];

  const sliderImage = document.getElementById("slider-image");

  function changeImage() {
    if (sliderImage) {
      sliderImage.style.opacity = '0';

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        sliderImage.src = images[currentIndex];
        sliderImage.style.opacity = '1';
      }, 300);
    }
  }

  setInterval(changeImage, 1500);
}
