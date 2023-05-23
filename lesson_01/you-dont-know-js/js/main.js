'use strict';

const items = document.querySelector('.items');
const item = document.querySelectorAll('.item');
const propsLists = document.querySelectorAll('.props__list');
const propsItemTwo = document.querySelectorAll('.props__item_two');
const propsItemThree = document.querySelectorAll('.props__item_three');
const propsItemFour = document.querySelectorAll('.props__item_four');
const propsItemFive = document.querySelectorAll('.props__item_five');
const itemTitles = document.querySelectorAll('.item__title');

items.prepend(item[1]);
item[1].after(item[2]);
item[1].after(item[3]);
item[1].after(item[2]);

propsLists[2].append(propsItemTwo[8], propsItemTwo[9]);
propsLists[0].append(propsItemFour[5]);
propsItemFour[2].after(propsItemFour[5]);

propsLists[3].append(propsItemThree[0], propsItemThree[1],
    propsItemThree[2], propsItemThree[3], propsItemThree[4],
    propsItemThree[5], propsItemThree[6]);

propsLists[4].append(propsItemFive[0], propsItemFive[1],
    propsItemFive[2], propsItemFive[3], propsItemFive[4],
    propsItemFive[5], propsItemFive[6], propsItemFive[7]);

itemTitles[1].after(itemTitles[3]);
itemTitles[4].after(itemTitles[1]);
propsLists[4].before(itemTitles[4]);
