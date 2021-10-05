import DatePicker from "./datepicker.js";

class Popup {
    constructor(order, element) {
        this.order = order;
        this.element = element;
    }

    show() {
        const html = `
        <div class="popup-hide">
        <div id="popup-custom">
        <div class="popup-content">
            <div class="content-left-menu">
                <div class="header-row">
                    <input type="text" id="order-number" value="${this.order.text}">
                    <div class="select-element" id="order-src">
                        <span class="select-text">${this.order.src}</span>
                        <div class="popup-select-close"></div>
                    </div>
                    <div class="menu__date">
                        <div class="menu__date-picker">
                           <div class="date-picker__text">
                              <span class="selected-date">${this.order.date}</span>
                              <span class="selected-time" style="font-weight: 300;">${this.order.time}</span>
                           </div>
                           <div class="date-picker__calendar"></div>
                        </div>
                        <div class="date__wrap"></div>
                     </div>
                     <div class="select-element" id="order-urgency">
                        <span class="select-text">${this.order.needed === "threeFire" ? `
                        <img src="img/fire.png" />
                        <img src="img/fire.png" />
                        <img src="img/fire.png" />
                        ` : this.order.needed === "twoFire" ? `
                        <img src="img/fire.png" />
                        <img src="img/fire.png" />
                        ` : `
                        <img src="img/${this.order.needed}.png" />
                        `}  </span>
                        <div class="popup-select-close"></div>
                     </div>
                </div>
                <div class="orders-content">
                    <div class="orders-content-header">
                        <span style="width: 180px;">Товар</span>
                        <span style="width: 137px">Вес</span>
                        <span style="width: 96px;">Цена</span>
                        <span style="width: 96px;">Себестоим.</span>
                        <span style="width: 96px;">Прибыль</span>
                    </div>
                    <div class="orders-rows">
                        ${this.getItems(this.order.items)}
                        
                        <div class="order-row order-total">
                            <div class="order-total-item order-total-item-count">
                                <span>---</span>
                            </div>
                            <div class="order-total-item order-total-item-weight">
                                <span>---</span>

                            </div>
                            <div class="order-total-item">
                                <span>---</span>

                            </div>
                            <div class="order-total-item">
                                <span>---</span>

                            </div>
                            <div class="order-total-item">
                                <span>---</span>

                            </div>
                        </div>
                    </div>
                    <div class="order-add-row"><span>+ Добавить</span></div>                
                    <div class="order-delivery-elements">
                        <div class="order-delivery">
                            Доставка: <input type="text" class="order-delivery-input order-input" value=${this.order.deliveryPrice} />
                        </div>
                        <div class="order-bottom-price">
                            Итого: <input type="text" class="order-price-input order-input" value="${this.order.price}"/>
                        </div>
                    </div>    
                </div>
            </div>
            <div class="content-right-menu">
                <div class="header-row">
                    <div class="select-element" id="order-to">
                        <span class="select-text">${this.order.to}</span>
                        <div class="popup-select-close"></div>
                    </div>
                    <input class="order-code" value="${this.order.code}" />
                     <div class="select-element" id="order-status">
                        <span class="select-text">${this.order.status}</span>
                        <div class="popup-select-close"></div>
                     </div>
                </div>
                <input type="text" class="order-address" value="${this.order.address}"/>
                <textarea class="order-com" placeholder="Коментарий">${this.order.comments}</textarea>
                <div class="order-buttons-right">
                    <div class="order-delete">Удалить</div>
                    <div class="order-save">Сохранить</div>
                </div>
            </div>
        </div>
        <div class="close-popup">

        </div>
    </div>
    </div>`



    const placeholder = document.createElement('div');
    placeholder.innerHTML = html;
    const node = placeholder.firstElementChild;
    document.body.insertAdjacentElement("afterbegin",node);
    const close_btn = document.querySelector(".close-popup")
    const delete_btn = document.querySelector(".order-delete")
    const save_btn = document.querySelector(".order-save");
    save_btn.addEventListener("click",() => node.remove);
    delete_btn.addEventListener("click", this.deletePopup.bind(this,node));;
    close_btn.addEventListener("click", () => node.remove());
    //date
    const el = document.querySelector(".date__wrap");
    el.addEventListener("click", (e) => this.showDate(e));
   
 }
 showDate(e) {
    if(!((' ' + e.target.className + ' ').indexOf(' ' + "date__wrap" + ' ') > -1 && (this.datepicker !== undefined || this.datepicker !== null))) {
        return
     };
    if(!this.datepicker) {
        const [day, month, year] = this.order.date.split(".")
        const [hourse, minutes] = this.order.time.split(":");
        this.datepicker = new DatePicker(e, false,{
            selectedDay: day,
            selectedMonth: month - 1,
            selectedYear: year,
            selectedTime: [Number.parseInt(hourse), Number.parseInt(minutes)]
        })
        this.datepicker.addHTML();
        return;
    }
    if(!this.datepicker.isActive()) {
        this.datepicker.addHTML();
    } else {    
        if((' ' + e.target.className + ' ').indexOf(' ' + "date__wrap" + ' ') > -1) {
            this.datepicker.closeOut()
            this.datepicker = null;
        }
    }
}
    deletePopup(openedPopup) {
        const html = `
        <div class="popup-hide-delete">
        <div id="popup2" class="popup">
            <div class="popup__body2">
                <div class="popup__content2">
                    <a href="#" class="popup__close2">&times;</a>
                    <div class="delete__img">
                        <picture><source srcset="img/delete.webp" type="image/webp"><img src="img/delete.png" alt="delete"></picture>
                    </div>
                    <div class="delete__title">
                        <h2 class="title">Вы хотите удалить:</h2>
                        <h2 class="sub__title">Заказ <span class="number" id="number">G12SDASD32134</span></h2>
                    </div>
                    <div class="delete__btn">
                        <button class="btn__cancellation">Отмена</button>
                        <button class="btn__delet">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `
        
        const placeholder = document.createElement('div');
        placeholder.innerHTML = html;
        const node = placeholder.firstElementChild;
        document.body.insertAdjacentElement("afterbegin",node);
        const close_delete_btn = document.querySelector(".popup__close2")
        const cancel_delete_btn = document.querySelector(".btn__cancellation"); 
        const accept_delete_btn = document.querySelector(".btn__delet");
        close_delete_btn.addEventListener("click",() => node.remove())
        cancel_delete_btn.addEventListener("click",() => node.remove())
        accept_delete_btn.addEventListener("click", () => {
            this.element.remove();
            node.remove();
            openedPopup.remove();
        })
    }

    getItems(items) {
        let html = ``;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            html += `
            <div class="order-row">
                <div class="order-item row-item select-element">
                    <span class="select-text">${item.name}</span>    
                    <div class="popup-select-close"></div>
                </div>
                <div class="order-weight row-item select-element">
                    <span class="select-text">${item.weight}</span>    
                    <div class="popup-select-close"></div>
                </div>
                <input type="text" class="order-price row-item" value="${item.price}"  placeholder="---"/>
                <input type="text" class="order-currentPrice row-item" value="${item.costPrice}"" placeholder="---"/>
                <input type="text" class="order-profit row-item" value="${item.profit}" placeholder="---"/>
            </div>
            `
        }
        return html;
    }
    
}
export default Popup;