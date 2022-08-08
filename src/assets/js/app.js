'use strict';
let $ = document;
const menu = $.querySelector('#menu_list');
const light = menu.nextElementSibling;
const sliders = $.querySelectorAll('.rangeSliders');
const bxshBox = $.querySelector('#boxShadowMagic_sample');
let [xBxsh, yBxsh, blurBxsh, spreadBxsh, colorBxsh] = [0, 0, 0, 0, '#5e81ec'];

bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${colorBxsh}`;

function getRGB(rgbString) {
  rgbString = rgbString.replace('rgb(', '');
  rgbString = rgbString.replace(')', '');
  rgbString = rgbString.trim();
  return rgbString.split(', ');
}
// console.log(getRGB('rgb(255, 209, 130)'));

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
let rangeSliders = $.querySelectorAll('.slider_range_input');
rangeSliders.forEach((rangeSlider) => {
  rangeSlider.addEventListener('input', function () {
    this.value = +this.value;
    let navigator = this.previousElementSibling;
    navigator.textContent = this.value;
    navigator.classList.add('show');
  });
  rangeSlider.addEventListener('blur', function () {
    this.previousElementSibling.classList.remove('show');
  });
});

// color picker for magic box shadow
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
  // colorBxsh = color.hexString;
  bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${color.hexString}`;
});
[...$.querySelector('#bxsh_colorPalette').children].forEach(
  (bxshColorPalette) => {
    bxshColorPalette.addEventListener('click', function () {
      boxShadowSliderPicker.color.set(bxshColorPalette.style.backgroundColor);
    });
  }
);
//
// $.querySelector('#bxsh_inset_input').addEventListener('input', function () {
//   if (this.checked) {
//     inset = true;
//     bxshBox.style.boxShadow = `${inset ? 'inset' :''}`+ bxshBox.style.boxShadow;
//   } else {
//     inset = false;
//     bxshBox.style.boxShadow = bxshBox.style.boxShadow.replace('inset','');
//   }
// });
