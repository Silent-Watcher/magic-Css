'use strict';
// bxsh stands for box-shadow
let $ = document;
const menu = $.querySelector('#menu_list'),
 light = menu.nextElementSibling,
 sliders = $.querySelectorAll('.rangeSliders'),
 bxshBox = $.querySelector('#boxShadowMagic_sample'),
 bxshResultDisplay = $.querySelector('#bxsh_result_display'),
 bxshResultBtn = bxshResultDisplay.lastElementChild,
 gdColorInfoRight = $.querySelector('#gd__ColorInfo__right'),
 gdColorInfoLeft = $.querySelector('#gd__ColorInfo__left');
//
let bxshSliderRanges = $.querySelectorAll('.bxsh_slider_range');
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
const gradientResultDisplay = $.querySelector('#gradient_result');
const gradientAngleTool = $.querySelector('#gradient_angle');
const gradientAngleSliderRange = $.querySelector('#gd_angle');
const gradientClipboardResult = $.querySelector('#gradient_clipboard')
  .firstElementChild.firstElementChild;
let [gdType, degree, colorLeft, colorRight] = [
  'linear',
  243,
  'rgba(2,0,36,1)',
  'rgba(94,129,236,1)',
];
//
const txtShadowInput = $.querySelector('#txtShadow_input').lastElementChild;
const txtShadowLabel = txtShadowInput.previousElementSibling;
const txtShadowResultDisplay = $.querySelector('#txtShadow_result_display');
const txtShadowColor = $.querySelector('#txtShadow_color');
const txtShadowClipboard = $.querySelector('#txtShadow_clipboard');
const txtShadowClipboardTxt =
  txtShadowClipboard.firstElementChild.firstElementChild;
const txtShadowSliderRanges = $.querySelectorAll('.txtsh_slider_range');

let [x_txt_sh, y_txt_sh, blur_txt_sh, color_txt_sh] = [40, 35, 12, '#5e81ec'];
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
    light.style.left = `${menuItem.offsetLeft + light.offsetWidth / 4}px`;
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
// detect color change magic box shadow
boxShadowSliderPicker.on(['color:init', 'color:change'], (color) => {
  // Show the current color in different formats
  colorBxsh = color.hexString;
  $.querySelector('#bxsh_hex').value = color.hexString;
  $.querySelector('#bxsh_r').value = getRGB(color.rgbString)[0];
  $.querySelector('#bxsh_g').value = getRGB(color.rgbString)[1];
  $.querySelector('#bxsh_b').value = getRGB(color.rgbString)[2];
  bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${colorBxsh}`;
  bxshResultDisplay.firstElementChild.firstElementChild.innerHTML =
    bxshBox.style.boxShadow;
  hljs.highlightAll();
});
[...$.querySelector('#bxsh_colorPalette').children].forEach(
  (bxshColorPalette) => {
    bxshColorPalette.addEventListener('click', () => {
      boxShadowSliderPicker.color.set(bxshColorPalette.style.backgroundColor);
    });
  }
);
// range slide value change detect for box shadows
bxshSliderRanges.forEach((bxshSliderRange) => {
  bxshSliderRange.firstElementChild.nextElementSibling.lastElementChild.addEventListener(
    'change',
    function () {
      if (this.id === 'x_bxsh') {
        xBxsh = this.value;
        bxshBox.style.boxShadow = `${this.value}px ${yBxsh}px ${blurBxsh}px ${spreadBxsh}px ${colorBxsh}`;
      }
      if (this.id === 'y_bxsh') {
        yBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${this.value}px ${blurBxsh}px ${spreadBxsh}px ${colorBxsh}`;
      }
      if (this.id === 'blur_bxsh') {
        blurBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${this.value}px ${spreadBxsh}px ${colorBxsh}`;
      }
      if (this.id === 'spread_bxsh') {
        spreadBxsh = this.value;
        bxshBox.style.boxShadow = `${xBxsh}px ${yBxsh}px ${blurBxsh}px ${this.value}px ${colorBxsh}`;
      }
      bxshResultDisplay.firstElementChild.firstElementChild.innerHTML =
        bxshBox.style.boxShadow;
      hljs.highlightAll();
    }
  );
});
//

// ------------------copy to clipboard functionality ------------
let copyToClipBoardBtns = $.querySelectorAll('.copyToClipboardBtn');
copyToClipBoardBtns.forEach((copyToClipBoardBtn) => {
  copyToClipBoardBtn.parentElement.addEventListener('mouseenter', function () {
    copyToClipBoardBtn.style.transform = 'scale(1)';
  });
  copyToClipBoardBtn.parentElement.addEventListener('mouseleave', function () {
    copyToClipBoardBtn.style.transform = 'scale(0)';
  });
  copyToClipBoardBtn.addEventListener('click', function () {
    Toast.fire({
      icon: 'success',
      title: 'copied to clipboard 🤗',
    });
    this.firstElementChild.classList.replace('fa-clipboard-list', 'fa-check');
    navigator.clipboard.writeText(
      this.previousElementSibling.firstElementChild.textContent
    );
    // tooltip.setContent({ '.tooltip-inner': 'copied !' });
    this.style.backgroundColor = '#7ed321';
    setTimeout(() => {
      this.style.backgroundColor = '#4169e1';
      this.firstElementChild.classList.replace('fa-check', 'fa-clipboard-list');
      // tooltip.setContent({ '.tooltip-inner': 'copy to clip board' });
    }, 500);
  });
  copyToClipBoardBtn.addEventListener('mouseenter', function () {
    // tooltip.enable();
  });
  copyToClipBoardBtn.addEventListener('mouseleave', function () {
    // tooltip.hide();
  });
});
// ----------------------------------------------------------
// --------------------------------------------------------------- gradient section ------------------------------
// color pickers initial
let gradientColorPickerLeft = new iro.ColorPicker(
  '#gradient_color_picker_left',
  {
    width: 160,
    color: '#4169e1',
    borderWidth: 1,
    borderColor: '#fff',
    layout: [
      {
        component: iro.ui.Box,
      },

      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue',
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
let gradientColorPickerRight = new iro.ColorPicker(
  '#gradient_color_picker_right',
  {
    width: 160,
    color: 'rgba(2,0,36,1)',
    borderWidth: 1,
    borderColor: '#fff',
    layout: [
      {
        component: iro.ui.Box,
      },

      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue',
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

gradientClipboardResult.innerHTML =
  'background: ' +
  `${gdType}-gradient(${
    gdType === 'linear' ? degree + 'deg' : 'circle'
  },${colorLeft},${colorRight})`;

gradientResultDisplay.style.background = `${gdType}-gradient(${
  gdType === 'linear' ? degree + 'deg' : 'circle'
},${colorLeft},${colorRight})`;

const gradientSelectType = $.querySelector('#gradient_select');
gradientSelectType.addEventListener('change', function () {
  gdType = this.value;
  // appear and disappear the angle section
  if (gdType === 'radial') gradientAngleTool.style.transform = 'scale(0)';
  else gradientAngleTool.style.transform = 'scale(1)';
  //
  // update gradient display degree in linear mode
  gradientResultDisplay.style.background = `${gdType}-gradient(${
    gdType === 'linear' ? degree + 'deg' : 'circle'
  },${colorLeft},${colorRight})`;
  //
  gradientClipboardResult.innerHTML =
    'background: ' +
    `${gdType}-gradient(${
      gdType === 'linear' ? degree + 'deg' : 'circle'
    },${colorLeft},${colorRight})`;
  hljs.highlightAll();
});
//  update gradient display mode [linear , radial]
gradientAngleSliderRange.addEventListener('input', function () {
  degree = this.value;
  //
  gradientResultDisplay.style.background = `${gdType}-gradient(${
    gdType === 'linear' ? degree + 'deg' : 'circle'
  },${colorLeft},${colorRight})`;
  //
  gradientClipboardResult.innerHTML =
    'background: ' +
    `${gdType}-gradient(${
      gdType === 'linear' ? degree + 'deg' : 'circle'
    },${colorLeft},${colorRight})`;
  hljs.highlightAll();
});
//
// update gradient color
// first color
gradientColorPickerLeft.on(['color:init', 'color:change'], function (color) {
  $.querySelector('#gd_hex_left').value = color.hexString;
  $.querySelector('#gd_r_left').value = getRGB(color.rgbString)[0];
  $.querySelector('#gd_g_left').value = getRGB(color.rgbString)[1];
  $.querySelector('#gd_b_left').value = getRGB(color.rgbString)[2];
  colorLeft = color.rgbString;
  gradientClipboardResult.innerHTML =
    'background: ' +
    `${gdType}-gradient(${
      gdType === 'linear' ? degree + 'deg' : 'circle'
    },${colorLeft},${colorRight})`;
  gradientResultDisplay.style.background = `${gdType}-gradient(${
    gdType === 'linear' ? degree + 'deg' : 'circle'
  },${colorLeft},${colorRight})`;
  hljs.highlightAll();
});
// second color
gradientColorPickerRight.on(['color:init', 'color:change'], function (color) {
  $.querySelector('#gd_hex_right').value = color.hexString;
  $.querySelector('#gd_r_right').value = getRGB(color.rgbString)[0];
  $.querySelector('#gd_g_right').value = getRGB(color.rgbString)[1];
  $.querySelector('#gd_b_right').value = getRGB(color.rgbString)[2];
  colorRight = color.rgbString;
  gradientClipboardResult.innerHTML =
    'background: ' +
    `${gdType}-gradient(${
      gdType === 'linear' ? degree + 'deg' : 'circle'
    },${colorLeft},${colorRight})`;
  gradientResultDisplay.style.background = `${gdType}-gradient(${
    gdType === 'linear' ? degree + 'deg' : 'circle'
  },${colorLeft},${colorRight})`;
  hljs.highlightAll();
});
// --------------------------------------------------------------- txt shadow section ------------------------------
// moving label effect
txtShadowInput.addEventListener('focus', function () {
  txtShadowLabel.classList.add('active_label');

  this.style.borderColor = '#5e81ec';
});
txtShadowInput.addEventListener('blur', function () {
  if (txtShadowInput.value.trim() !== '')
    txtShadowLabel.classList.add('filled');
  else txtShadowLabel.classList.remove('filled');
  txtShadowLabel.classList.remove('active_label');
  this.style.borderColor = '#232323';
});
// change display text  dynamically
txtShadowInput.addEventListener('input', function () {
  txtShadowResultDisplay.firstElementChild.innerHTML = this.value;
});
// initial txt shadow color picker
let txtShadowColorPicker = new iro.ColorPicker(
  txtShadowColor.firstElementChild,
  {
    width: 250,
    color: '#5e81ec',
    borderWidth: 1,
    borderColor: '#fff',
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue',
        },
      },
    ],
  }
);
// Initial quantification
txtShadowClipboardTxt.innerHTML =
  'text-shadow: ' +
  `${x_txt_sh}px ${y_txt_sh}px ${blur_txt_sh}px ${color_txt_sh}`;
// change the text shadow value dynamically
txtShadowSliderRanges.forEach((txtShadowSliderRange) => {
  txtShadowSliderRange.firstElementChild.nextElementSibling.lastElementChild.addEventListener(
    'input',
    function () {
      if (this.id === 'x_txtsh') {
        x_txt_sh = this.value;
      }
      if (this.id === 'y_txtsh') {
        y_txt_sh = this.value;
      }
      if (this.id === 'blur_txtsh') {
        blur_txt_sh = this.value;
      }
      txtShadowResultDisplay.firstElementChild.style.textShadow = `${x_txt_sh}px ${y_txt_sh}px ${blur_txt_sh}px ${color_txt_sh}`;
      txtShadowClipboardTxt.innerHTML =
        'text-shadow: ' +
        `${x_txt_sh}px ${y_txt_sh}px ${blur_txt_sh}px ${color_txt_sh}`;
      hljs.highlightAll();
    }
  );
});
// set and change the text color dynamically
txtShadowColorPicker.on(['color:init', 'color:change'], function (color) {
  $.querySelector('#txtsh_hex').value = color.hexString;
  $.querySelector('#txtsh_r').value = getRGB(color.rgbString)[0];
  $.querySelector('#txtsh_g').value = getRGB(color.rgbString)[1];
  $.querySelector('#txtsh_b').value = getRGB(color.rgbString)[2];
  color_txt_sh = color.hexString;
  txtShadowResultDisplay.firstElementChild.style.textShadow = `${x_txt_sh}px ${y_txt_sh}px ${blur_txt_sh}px ${color_txt_sh}`;
  txtShadowClipboardTxt.innerHTML =
    'text-shadow: ' +
    `${x_txt_sh}px ${y_txt_sh}px ${blur_txt_sh}px ${color_txt_sh}`;
  hljs.highlightAll();
});
// --------------------------------------------------------------- border radius section ------------------------------
const allSidesBorderSectionTools = $.querySelector('#allSidesBorder_section');
const eachSideBorderSection = $.querySelector('#eachSideBorder_section');
const borderMode = $.querySelector('#borderMode');
const borderSliderRanges = $.querySelectorAll('.border_range');
const borderResultSample = $.querySelector('#border_result_sample');
const borderPixelUnit = $.querySelector('#pixel_border_unit');
const borderPercentUnit = $.querySelector('#pixel_border_unit');
const borderUnits = $.querySelectorAll('.border_units');
let borderClipboard =
  $.querySelector('#border_clipboard').firstElementChild.firstElementChild;
let [topLeft, topRight, bottomRight, bottomLeft, allSideBorderValue] = [
  21, 32, 47, 105, 10,
];
// change border tools section
borderMode.addEventListener('change', function () {
  if (this.value === 'different') {
    allSidesBorderSectionTools.hidden = true;
    eachSideBorderSection.hidden = false;
  } else {
    allSidesBorderSectionTools.hidden = false;
    eachSideBorderSection.hidden = true;
  }
});
//
borderUnits.forEach((borderUnit) => {
  borderUnit.addEventListener('click', function () {
    if (this.checked && this.id === 'pixel_border_unit')
      $.querySelector('#allSidesBorder_input').max = 100;
    else $.querySelector('#allSidesBorder_input').max = 50;
  });
});
//
borderSliderRanges.forEach((borderSliderRange) => {
  borderSliderRange.addEventListener('input', function () {
    if (this.id === 'allSidesBorder_input') {
      allSideBorderValue = this.value;
      if (borderPixelUnit.checked) {
        borderResultSample.style.borderRadius = `${allSideBorderValue}px`;
        borderClipboard.innerHTML =
          'border-radius: ' + `${allSideBorderValue}px`;
      } else {
        borderResultSample.style.borderRadius = `${allSideBorderValue}%`;
        borderClipboard.innerHTML =
          'border-radius: ' + `${allSideBorderValue}%`;
      }
      hljs.highlightAll();
    } else {
      if (this.id === 'topLeftBorder_input') {
        topLeft = this.value;
      }
      if (this.id === 'bottomLeftBorder_input') {
        bottomLeft = this.value;
      }
      if (this.id === 'topRightBorder_input') {
        topRight = this.value;
      }
      if (this.id === 'bottomRightBorder_input') {
        bottomRight = this.value;
      }
      if (borderPixelUnit.checked) {
        borderResultSample.style.borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
        borderClipboard.innerHTML =
          'border-radius: ' +
          `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
      } else {
        borderResultSample.style.borderRadius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
        borderClipboard.innerHTML =
          'border-radius: ' +
          `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
      }
      hljs.highlightAll();
    }
  });
});
// --------------------------------------------------------------- page transition animation ------------------------------
const pages = [...$.querySelector('#pages').children];
const bxsh_page = $.querySelector('#boxShadowMagic__page');
const txtSh_page = $.querySelector('#txtShadow_page');
const gradient_page = $.querySelector('#gradient_page');
const border_page = $.querySelector('#border_page');

[...menu.children].forEach((menuItem) => {
  menuItem.addEventListener('click', function () {
    if (this.dataset.target === 'bxSh_page_menu') changePageTo(bxsh_page);
    if (this.dataset.target === 'txtSh_page_menu') changePageTo(txtSh_page);
    if (this.dataset.target === 'gradient_page_menu') changePageTo(gradient_page);
    if (this.dataset.target === 'border_page_menu') changePageTo(border_page);
  });
});

function changePageTo(page) {
  page.classList.add('appearPage');
  siblings(page).map((sibling) => {
    if (sibling.classList.contains('appearPage'))
      sibling.classList.remove('appearPage');
  });
}
