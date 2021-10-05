// @import(classie.js)
// @import(uisearch.js)
/*Поддерживает ли браузер WebP изображение, если да body + class'webp' or 'no-webp' */
function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function() {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function(support) {
   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});
/*Поддерживает ли браузер WebP изображение, если да body + class'webp' or 'no-webp' */
/*Опеределение устройства (Pc, Touch) ////////////////////////////////////////////////////////////////////////////////////////// */
const isMobile = {
   Android: function() {
      return navigator.userAgent.match(/Android/i);
   },
   BackBerry: function() {
      return navigator.userAgent.match(/BackBerry/i);
   },
   iOS: function() {
      return navigator.userAgent.match(/iPhote|iPad|iPod/i);
   },
   Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function() {
      return (
         isMobile.Android() ||
         isMobile.BackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
   document.body.classList.add('_pc');

   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", function(e) {
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }

} else {
   document.body.classList.add('_pc');
} /*Если в else сменить _pc на _touch то будет баг на всех мобильных устройствах с открытием выпадающего меню в некоторых елементах */
/*Опеределение устройства (Pc, Touch) /////////////////////////////////////////////////////////////////////////////////// */

// Выпадающое меню //////////////////////////////////////////////////

function dropDownMenu() {
   document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
   if (!event.target.matches('.button__list')) {

      var dropdowns = document.getElementsByClassName("button__list-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
         var openDropdown = dropdowns[i];
         if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
         }
      }
   }
}

// Выпадающое меню //////////////////////////////////////////////////

/////Select-castom///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
// Toggle menu
selectSingle_title.addEventListener('click', () => {
   if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
   } else {
      selectSingle.setAttribute('data-state', 'active');
   }
});
// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
   selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
   });
}
// Reset title
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
   selectSingle_title.textContent = selectSingle_title.getAttribute('data-default');
});

/////Select-castom///////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////Select-castom2///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function tamingselect() {
   if (!document.getElementById && !document.createTextNode) { return; }

   // Classes for the link and the visible dropdown
   var ts_selectclass = 'turnintodropdown'; // class to identify selects
   var ts_listclass = 'turnintoselect'; // class to identify ULs
   var ts_boxclass = 'dropcontainer'; // parent element
   var ts_triggeron = 'activetrigger'; // class for the active trigger link
   var ts_triggeroff = 'trigger'; // class for the inactive trigger link
   var ts_dropdownclosed = 'dropdownhidden'; // closed dropdown
   var ts_dropdownopen = 'dropdownvisible'; // open dropdown
   /*
   	Turn all selects into DOM dropdowns
   */
   var count = 0;
   var toreplace = new Array();
   var sels = document.getElementsByTagName('select');
   for (var i = 0; i < sels.length; i++) {
      if (ts_check(sels[i], ts_selectclass)) {
         var hiddenfield = document.createElement('input');
         hiddenfield.name = sels[i].name;
         hiddenfield.type = 'hidden';
         hiddenfield.id = sels[i].id;
         hiddenfield.value = sels[i].options[0].value;
         sels[i].parentNode.insertBefore(hiddenfield, sels[i])
         var trigger = document.createElement('a');
         ts_addclass(trigger, ts_triggeroff);
         trigger.href = '#';
         trigger.onclick = function() {
            ts_swapclass(this, ts_triggeroff, ts_triggeron)
            ts_swapclass(this.parentNode.getElementsByTagName('ul')[0], ts_dropdownclosed, ts_dropdownopen);
            return false;
         }
         trigger.appendChild(document.createTextNode(sels[i].options[0].text));
         sels[i].parentNode.insertBefore(trigger, sels[i]);
         var replaceUL = document.createElement('ul');
         for (var j = 0; j < sels[i].getElementsByTagName('option').length; j++) {
            var newli = document.createElement('li');
            var newa = document.createElement('a');
            newli.v = sels[i].getElementsByTagName('option')[j].value;
            newli.elm = hiddenfield;
            newli.istrigger = trigger;
            newa.href = '#';
            newa.appendChild(document.createTextNode(
               sels[i].getElementsByTagName('option')[j].text));
            newli.onclick = function() {
               this.elm.value = this.v;
               ts_swapclass(this.istrigger, ts_triggeron, ts_triggeroff);
               ts_swapclass(this.parentNode, ts_dropdownopen, ts_dropdownclosed)
               this.istrigger.firstChild.nodeValue = this.firstChild.firstChild.nodeValue;
               return false;
            }
            newli.appendChild(newa);
            replaceUL.appendChild(newli);
         }
         ts_addclass(replaceUL, ts_dropdownclosed);
         var div = document.createElement('div');
         div.appendChild(replaceUL);
         ts_addclass(div, ts_boxclass);
         sels[i].parentNode.insertBefore(div, sels[i])
         toreplace[count] = sels[i];
         count++;
      }
   }

   /*
   	Turn all ULs with the class defined above into dropdown navigations
   */

   var uls = document.getElementsByTagName('ul');
   for (var i = 0; i < uls.length; i++) {
      if (ts_check(uls[i], ts_listclass)) {
         var newform = document.createElement('form');
         var newselect = document.createElement('select');
         for (j = 0; j < uls[i].getElementsByTagName('a').length; j++) {
            var newopt = document.createElement('option');
            newopt.value = uls[i].getElementsByTagName('a')[j].href;
            newopt.appendChild(document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML));
            newselect.appendChild(newopt);
         }
         newselect.onchange = function() {
            window.location = this.options[this.selectedIndex].value;
         }
         newform.appendChild(newselect);
         uls[i].parentNode.insertBefore(newform, uls[i]);
         toreplace[count] = uls[i];
         count++;
      }
   }
   for (i = 0; i < count; i++) {
      toreplace[i].parentNode.removeChild(toreplace[i]);
   }

   function ts_check(o, c) {
      return new RegExp('\\b' + c + '\\b').test(o.className);
   }

   function ts_swapclass(o, c1, c2) {
      var cn = o.className
      o.className = !ts_check(o, c1) ? cn.replace(c2, c1) : cn.replace(c1, c2);
   }

   function ts_addclass(o, c) {
      if (!ts_check(o, c)) { o.className += o.className == '' ? c : ' ' + c; }
   }
}

window.onload = function() {
   tamingselect();
   // add more functions if necessary
}

/////Select-castom2///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import DatePicker from "./datepicker.js";
let datepicker;
const el = document.querySelector(".date__wrap");
const popup = document.querySelector(".popup__close")
const need_date = document.querySelector(".menu__date .selected-date");
const need_time = document.querySelector(".menu__date .selected-time");

popup.addEventListener("click", closePopup);
function closePopup() {
   datepicker = null;
   need_date.textContent = "Дата";
   need_time.textContent = "Время";
}
el.addEventListener("click", show);
function show(e) {
   if(!((' ' + e.target.className + ' ').indexOf(' ' + "date__wrap" + ' ') > -1 && (datepicker !== undefined || datepicker !== null))) {
      return;
   }
   if(!datepicker) {
       datepicker = new DatePicker(e)
       datepicker.addHTML();
       return;
   }
   if(!datepicker.isActive()) {
       datepicker.addHTML();
   } else {    
       if((' ' + e.target.className + ' ').indexOf(' ' + "date__wrap" + ' ') > -1) {
           datepicker.closeOut()
       }
   }
   
}


// OPEN ORDER
import OrderModel from "./models/OrderModel.js";
import ItemModel from "./models/ItemModel.js";
const src_items = {
   telegram: "Telegram",
   self: "Личный",
   gold: "Gold",
   res: "Ресурс"
}
const src_items_icons = {
   "Telegram": "_icon-Vector",
   "Личный": "_icon-personal",
   "Gold": "_icon-gold",
   "Ресурс": "_icon-resource"
}
const to_items = {
   msk: "МСК",
   spb: "СПБ",
   ckad: "ЦКАД",
}

const need_items = {
   fire: "fire",
   twoFire: "twoFire",
   threeFire: "threeFire",
   rocket: "rocket",
   sneakers: "sneakers",
   no: "Нет"
}

const status_items = {
   paid: "Оплачен",
   delivery: "В доставке",
   waiting: "В ожидании",
   remortgage: "Перезаклад",
   delivered: "Доставлен",
}
const status_items_icons = {
   "Оплачен": "_icon-paid",
   "В ожидании": "_icon-expectation",
   "Перезаклад": "_icon-remortgaging",
   "Доставлен": "_icon-delivered"
}

const item_test = new ItemModel({
   name: "Гвозди",
   weight: "5г",
   price: 250,
   costPrice: 2000,
   profit: 2
})
const item_test2 = new ItemModel({
   name: "Что-то",
   weight: "10г",
   price: 250,
   costPrice: 2000,
   profit: 2
})

const order1 = new OrderModel({
   text: "text123",
   src: src_items.telegram,
   date: "04.10.2021",
   time: "23:04",
   needed: need_items.threeFire,
   to: to_items.spb,
   code: 120,
   status: status_items.paid,
   address: "ул. Пушкина",
   comments: "Комментарий Комментарий Комментарий Комментарий Комментарий",
   items: [item_test,item_test2],
   deliveryPrice: 2452,
   price: 10000,
   manager: "Oleg",
})
const order2 = new OrderModel({
   text: "text12233",
   src: src_items.res,
   date: "01.10.2021",
   time: "03:04",
   needed: need_items.sneakers,
   to: to_items.msk,
   code: 120,
   status: status_items.waiting,
   address: "ул. Колотушкина",
   comments: "Комментарий Комментарий Комментарий Комментарий Комментарий",
   items: [item_test,item_test2],
   deliveryPrice: 2452,
   price: 10000,
   manager: "Grusha",
})
const order3 = new OrderModel({
   text: "G230135",
   src: src_items.self,
   date: "07.09.2021",
   time: "03:04",
   needed: need_items.fire,
   to: to_items.ckad,
   code: 120,
   status: status_items.remortgage,
   address: "ул. Колотушкина",
   comments: "Комментарий Комментарий Комментарий Комментарий Комментарий",
   items: [item_test,item_test2],
   deliveryPrice: 2452,
   price: 10000,
   manager: "Name 2",
})
let orders = [order1,order2,order3];
const orders_element = document.querySelector(".orders");

// Объект в котором хранятся все параметры сортировки
let sortParams = { };


printOrderRows()
function printOrderRows() {
   const rows_table = document.querySelector("section.orders")
   rows_table.innerHTML = null;

   orders.forEach(order => {
      const [day, month, year] = order.date.split(".")
      const date = new Date();
      const orderDate = new Date((Date.UTC(year,month - 1,day)));
      const diffDays = Math.floor((date - orderDate) / (1000 * 60 * 60 * 24));
      // Сортировка по номеру заказа
      if(sortParams.text && !order.text.toLowerCase().includes(sortParams.text.toLowerCase()))
         return;
      // Сортировка по источнику
      if(sortParams.source && sortParams.source.length > 0 && sortParams.source[0] !== "Все") {
         let success = false;
         sortParams.source.forEach(source => {
            if(order.src === source){
               success = true;
               return;
            }
         })
         if(!success)
            return;
      }
      // Сортировка по дате
      if(sortParams.date && sortParams.date.length > 0) {
         let success = false;
         sortParams.date.forEach(date => {
            switch (date) {
               case "Сегодня":
                  if(diffDays === 0)
                     success = true;
                  break;
               case "Вчера":
                  if(diffDays === 1)
                     success = true;
                  break;
               case "2 дня":
                  if(diffDays <= 2 && diffDays >= 0)
                     success = true;
                  break;
               case "3 дня":
                  if(diffDays <= 3 && diffDays >= 0)
                     success = true;
                  break;
               case "Неделя":
                  if(diffDays <= 7 && diffDays >= 0)
                     success = true;
                  break;
            }
         })
         if(!success)
            return;
      }
      // Сортировка по менеджеру 
      if(sortParams.manager && sortParams.manager.length > 0) {
         let success = false;
         sortParams.manager.forEach(manager => {
            if(order.manager === manager.trim()){
               success = true;
               return;
            }
         })
         if(!success)
            return;
      }
      // Сортировка по статусу
      if(sortParams.status && sortParams.status.length > 0) {
         let success = false;
         sortParams.status.forEach(status => {
            if(order.status === status){
               success = true;
               return;
            }
         })
         if(!success)
            return;
      }
      // Сортировка по городу
      if(sortParams.destination && sortParams.destination.length > 0 && sortParams.destination[0] !== "Все") {
         let success = false;
         sortParams.destination.forEach(dest => {  
            if(order.to === dest.trim()) {
               success = true;
               return;
            }
         })
         if(!success)
            return;
      }
      // Сортировка по срочности
      if(sortParams.urgency && sortParams.urgency.length > 0 && sortParams.urgency[0] !== "Все") {
         let success = false;
         sortParams.urgency.forEach(u => {
            if(order.needed === u) {
               success = true;
               return;
            }
         })
         if(!success)
            return;
      }
      const html = `<div class="orders__content">
   
      <div class="orders__wrapper-element">
         <div class="element__time"></div>
         <p>${diffDays === 0 ? 'Сегодня' : diffDays === 1 ? 'Вчера' : `${diffDays} дней назад`}</p>
      </div>
   
      <div class="element__body">
         <div class="element__body-number">
            <p class="number__title">${order.text}</p>
         </div>
   
         <div class="element__body-source">
            <div class="source">
               <li class="source-menu">
                  <span class="${src_items_icons[order.src]}"></span>
                  <p>${order.src}</p>
               </li>
            </div>
         </div>
   
         <div class="element__body-date">
            <p class="date__info">${order.date}</p>
            <p class="date__time">${order.time}</p>
         </div>
   
         <div class="element__body-manager">
            <p class="manager">${order.manager}</p>
         </div>
   
         <div class="element__body-urgency-wrapper">
            <div class="element__body-urgency">
               <div class="urgency">
                  <li class="urgency-menu">
                     <p class="urgency-logo">
                        ${order.needed === "threeFire" ? `
                        <picture><source srcset="img/fire.webp" type="image/webp"><img src="img/sneakers.png" alt="fire"></picture>
                        <picture><source srcset="img/fire.webp" type="image/webp"><img src="img/sneakers.png" alt="fire"></picture>
                        <picture><source srcset="img/fire.webp" type="image/webp"><img src="img/sneakers.png" alt="fire"></picture>
                        ` : order.needed === "twoFire" ? `
                        <picture><source srcset="img/fire.webp" type="image/webp"><img src="img/sneakers.png" alt="fire"></picture>
                        <picture><source srcset="img/fire.webp" type="image/webp"><img src="img/sneakers.png" alt="fire"></picture>
                        ` : `
                        <picture><source srcset="img/${order.needed}.webp" type="image/webp"><img src="img/${order.needed}.png" alt="fire"></picture>
                        `}
                     </p>
                     <ul class="urgency-submenu">
                        <li class="urgency-item">
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                        </li>
                        <li class="urgency-item">
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                        </li>
                        <li class="urgency-item">
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                           <p class="urgency-element"><picture><source srcset="img/fire.webp" type="image/webp"><img src="img/fire.png" alt="fire"></picture></p>
                        </li>
                        <li class="urgency-item">
                           <p class="urgency-element"><picture><source srcset="img/rocket.webp" type="image/webp"><img src="img/rocket.png" alt="rocket"></picture></p>
                        </li>
                        <li class="urgency-item">
                           <p class="urgency-element"><picture><source srcset="img/sneakers.webp" type="image/webp"><img src="img/sneakers.png" alt="sneakers"></picture></p>
                        </li>
                        <li class="urgency-item">
                           <p class="urgency-element">Нет</p>
                        </li>
                     </ul>
                  </li>
               </div>
            </div>
         </div>
   
         <div class="element__body-location">
            <div class="location">
               <li class="location-menu">
                  <p class="location-logo">${order.to}</p>
               </li>
            </div>
         </div>
   
         <div class="element__body-status">
            <div class="status">
               <li class="status-menu">
                  <span class="${status_items_icons[order.status]}"></span>
                  <a>${order.status}</a>  
                  <ul class="status-submenu">
                     <li class="status-item -paid">
                        <span class="_icon-paid"></span>
                        <a>Оплачен</a>
                     </li>
                     <li class="status-item -inDelivery">
                        <span class="_icon-inDelivery"></span>
                        <a>В доставке</a>
                     </li>
                     <li class="status-item -expectation">
                        <span class="_icon-expectation"></span>
                        <a>В ожидании</a>
                     </li>
                     <li class="status-item -remortgaging">
                        <span class="_icon-remortgaging"></span>
                        <a>Перезаклад</a>
                     </li>
                     <li class="status-item -delivered">
                        <span class="_icon-delivered"></span>
                        <a>Доставлен</a>
                     </li>
                  </ul>
               </li>
            </div>
         </div>
   
      </div>
   
   </div>`;
   const path = orders_element.children[orders_element.children.length - 1];
   const placeholder = document.createElement('div');
   placeholder.innerHTML = html;
   const node = placeholder.firstElementChild;

   node.addEventListener("click", (e) => openCreatedOrder(e,node,order))
   if(path)
      path.insertAdjacentElement("afterend", node);
   else
      orders_element.insertAdjacentElement("beforeend", node)
   });
}



import Popup from "./popup.js";

function openCreatedOrder(e, node, order) {
   if(e.target.localName === "img" 
   || e.target.localName === "li"
   || e.target.localName === "ul"
   || e.target.localName === "a"
   || e.target.localName === "span"
   || (e.target.localName === "p" && e.target.className === "urgency-element"))
      return;
   const popup = new Popup(order,node);
   popup.show();
}

// wrapper-function
const debounce = (fn, ms) => {
   let timeout;
   return function() {
      const fnCall = () => { fn.apply(this, arguments) }

      clearTimeout(timeout);

      timeout = setTimeout(fnCall, ms);
  }
}

// HEADER-SORT
function sortInputOnChange(e) {
   sortParams.text = e.target.value;
   printOrderRows();
}

sortInputOnChange = debounce(sortInputOnChange, 300);
const header_sort_input = document.querySelector("form.search input");
header_sort_input.addEventListener("keyup",sortInputOnChange);

const menu_sub_btns = document.querySelectorAll(".menu__sub-button");
menu_sub_btns.forEach(el => el.addEventListener("click",sortBtnObClick));

function sortBtnObClick(e) {
   const ulParent = e.target.parentElement.parentElement;
   const key = ulParent.parentElement.classList.value.split("-")[1];

   let value = [];

   for(let i = 0; i < ulParent.children.length - 1; i++) {
      let el = ulParent.children[i];
      console.log(el.children[1].children[0].children[0].children.length)
      if(el.children[0].checked) {
         if(el.children[1].children[0].children[1]){
            value.push(el.children[1].children[0].children[1].textContent);
         } else if(el.children[1].children[0].children[0].children.length > 1){
            switch (el.children[1].children[0].children[0].children.length) {
               case 3:
                  value.push("threeFire")
                  break;
               case 2:
                  value.push("twoFire")
                  break;
            }
         }else if(el.children[1].children[0].children[0].children.length === 1 && el.children[1].children[0].children[0].children[0].localName === "picture") {
            console.log(el.children[1].children[0].children[0].children[0].children[1])
            value.push(el.children[1].children[0].children[0].children[0].children[1].alt);
         } else {
            value.push(el.children[1].children[0].children[0].textContent);
         }
      }
   }

   sortParams[key] = value;
   printOrderRows();
}