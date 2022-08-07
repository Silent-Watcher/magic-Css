'use strict';
let $ = document;
const menu = $.querySelector('#menu_list');
const light = menu.nextElementSibling;

function siblings(element) {
  let siblings = [];
  [...element.parentElement.children].forEach((sibling) => {
    if (sibling !== element) siblings.push(sibling);
  });
  return siblings;
}

[...menu.children].forEach((menuItem) => {
  //   console.log(menuItem);
  menuItem.addEventListener('click', function () {
    light.style.left = `${menuItem.offsetLeft + light.offsetWidth / 3}px`;
    menuItem.firstElementChild.classList.add('active', 'text-primary');
    // console.log(siblings(menuItem));
    siblings(menuItem).forEach((sibling) => {
        sibling.firstElementChild.classList.remove('active','text-primary');
    });
  });
});
