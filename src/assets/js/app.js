'use strict';
// let $ = document;
const menu = document.querySelector('#menu_list');
const light = menu.nextElementSibling;
const sliders = document.querySelectorAll('.rangeSliders');

function siblings(element) {
  let siblings = [];
  [...element.parentElement.children].forEach((sibling) => {
    if (sibling !== element) siblings.push(sibling);
  });
  return siblings;
}
// navbar animation
[...menu.children].forEach((menuItem) => {
  menuItem.addEventListener('click', function () {
    light.style.left = `${menuItem.offsetLeft + light.offsetWidth / 3}px`;
    menuItem.firstElementChild.classList.add('active', 'text-primary');
    siblings(menuItem).forEach((sibling) => {
      sibling.firstElementChild.classList.remove('active', 'text-primary');
    });
  });
});
//
// slider value
sliders.forEach((slider) => {
  slider.addEventListener('input', function () {
    let sliderNavigator =
      this.parentElement.previousElementSibling.firstElementChild;
    sliderNavigator.textContent = +this.value;
    sliderNavigator.style.left = `${this.value/2}%`;
    sliderNavigator.classList.add('show');
  });
  slider.addEventListener('blur', function () {
    let sliderNavigator =
      this.parentElement.previousElementSibling.firstElementChild;
    sliderNavigator.classList.remove('show');
  });
});
// color picker
const colorPicker = new iro.ColorPicker('#color_picker');
