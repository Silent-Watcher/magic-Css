'use strict';
// bxsh stands for box-shadow
let $ = document;
const menu = $.querySelector('#menu_list');
const light = menu.nextElementSibling;
const sliders = $.querySelectorAll('.rangeSliders');
const bxshBox = $.querySelector('#boxShadowMagic_sample');
const bxshResultDisplay = $.querySelector('#bxsh_result_display');
const bxshResultBtn = bxshResultDisplay.lastElementChild;
let [xBxsh, yBxsh, blurBxsh, spreadBxsh, colorBxsh] = [0, 0, 0, 0, '#5e81ec'];
// color picker initialization for magic box shadow
let boxShadowSliderPicker = new iro.ColorPicker(
  '#color_boxShadow_color_picker',
  {
    width: 250,
    color: 'rgb(65, 105, 225)',
    borderWidth: 1,
    borderColor: '#fff',
    layout: [
      {
        component: iro.ui.Wheel,
        options: {
          sliderType: 'hue',
        },
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'saturation',
        },
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'value',
        },
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'alpha',
        },
      },
    ],
  }
);
//
// initial alert
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
// 
function getRGB(rgbString) {
  rgbString = rgbString.replace('rgb(', '');
  rgbString = rgbString.replace(')', '');
  rgbString = rgbString.trim();
  return rgbString.split(', ');
}
function siblings(element) {
  let siblings = [];
  [...element.parentElement.children].forEach((sibling) => {
    if (sibling !== element) siblings.push(sibling);
  });
  return siblings;
}
// initial highlight.js
hljs.highlightAll();
//
// Initial quantification for bxsh result
bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${colorBxsh}`;
bxshResultDisplay.firstElementChild.firstElementChild.innerHTML =
  bxshBox.style.boxShadow;
//
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
// slider value animation
let rangeSliders = $.querySelectorAll('.slider_range_input');
rangeSliders.forEach((rangeSlider) => {
  rangeSlider.addEventListener('input', function () {
    this.value = +this.value;
    let navigator = this.previousElementSibling;
    navigator.textContent = this.value;
    navigator.classList.add('show_range_slider');
  });
  rangeSlider.addEventListener('blur', function () {
    this.previousElementSibling.classList.remove('show_range_slider');
  });
});
// range slide value change detect
let bxshSliderRanges = document.querySelectorAll('.bxsh_slider_range');
bxshSliderRanges.forEach((bxshSliderRange) => {
  bxshSliderRange.firstElementChild.nextElementSibling.lastElementChild.addEventListener(
    'change',
    function () {
      if (this.id === 'x_bxsh') {
        xBxsh = this.value;
        bxshBox.style.boxShadow = `${this.value}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px #000`;
      }
      if (this.id === 'y_bxsh') {
        yBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${this.value}px ${blurBxsh}px ${spreadBxsh}px #000`;
      }
      if (this.id === 'blur_bxsh') {
        blurBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${this.value}px ${spreadBxsh}px #000`;
      }
      if (this.id === 'spread_bxsh') {
        spreadBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${this.value}px #000`;
      }
      bxshResultDisplay.firstElementChild.firstElementChild.innerHTML =
        bxshBox.style.boxShadow;
      hljs.highlightAll();
    }
  );
});
//
// detect color change magic box shadow
boxShadowSliderPicker.on(['color:init', 'color:change'], function (color) {
  // Show the current color in different formats
  $.querySelector('#bxsh_hex').value = color.hexString;
  $.querySelector('#bxsh_r').value = getRGB(color.rgbString)[0];
  $.querySelector('#bxsh_g').value = getRGB(color.rgbString)[1];
  $.querySelector('#bxsh_b').value = getRGB(color.rgbString)[2];
  bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${color.hexString}`;
  bxshResultDisplay.firstElementChild.firstElementChild.innerHTML =
    bxshBox.style.boxShadow;
  hljs.highlightAll();
});
[...$.querySelector('#bxsh_colorPalette').children].forEach(
  (bxshColorPalette) => {
    bxshColorPalette.addEventListener('click', function () {
      boxShadowSliderPicker.color.set(bxshColorPalette.style.backgroundColor);
    });
  }
);
// ------------------ copy bxsh result to the clipboard and show some stuff like tooltip and alert------------
const tooltip = new bootstrap.Tooltip(bxshResultDisplay.lastElementChild, {
  title: 'copy to clipboard',
  customClass: 'custom-tooltip',
  placement: 'top',
});
// appear copyToClipBoard btn
bxshResultDisplay.addEventListener('mouseenter', function () {
  this.lastElementChild.style.transform = 'scale(1)';
});
bxshResultDisplay.addEventListener('mouseleave', function () {
  this.lastElementChild.style.transform = 'scale(0)';
});
// copu to clipboard
bxshResultBtn.addEventListener('click', function () {
  Toast.fire({
    icon: 'success',
    title: 'copied to clipboard 🤗',
  });
  this.style.backgroundColor = '#7ed321';
  this.firstElementChild.classList.replace('fa-clipboard-list', 'fa-check');
  navigator.clipboard.writeText(
    this.previousElementSibling.firstElementChild.textContent
  );
  tooltip.setContent({ '.tooltip-inner': 'copied !' });
  setTimeout(() => {
    this.style.backgroundColor = '#4169e1';
    this.firstElementChild.classList.replace('fa-check', 'fa-clipboard-list');
    tooltip.setContent({ '.tooltip-inner': 'copy to clip board' });
  }, 500);
});
// show tooltip
bxshResultBtn.addEventListener('mouseenter', () => {
  tooltip.enable();
});
// hide tooltip
bxshResultBtn.addEventListener('mouseleave', () => {
  tooltip.hide();
});
// ----------------------------------------------------------
