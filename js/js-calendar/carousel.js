var currentSlide = 1;
var maxslide = 4;

function next() {
  const ele = document.getElementById(`slide-${currentSlide}`);
  ele.classList.remove("c-active");
  if (currentSlide === maxslide) {
    currentSlide = 1;
  } else {
    currentSlide++;
  }
  const newEle = document.getElementById(`slide-${currentSlide}`);
  newEle.classList.add("c-active");
}

function prev() {
  const ele = document.getElementById(`slide-${currentSlide}`);
  ele.classList.remove("c-active");
  if (currentSlide === 1) {
    currentSlide = maxslide;
  } else {
    currentSlide--;
  }
  const newEle = document.getElementById(`slide-${currentSlide}`);
  newEle.classList.add("c-active");
}
