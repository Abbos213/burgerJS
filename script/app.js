
const products = {

    crazy: {
        name: 'Crazy', // название бургера
        img: 'images/products/burger-1.png', // изображение бургера
        amount: 0, // кол-во
        price: 31000, // стоимость бургера
        get totalSumm() {
            return this.amount * this.price;
        } // общая стоимость выбранного продукта
    },
    light: {
        name: 'Light', // название бургера
        img: 'images/products/burger-2.png', // изображение бургера
        amount: 0, // кол-во
        price: 26000, // стоимость бургера
        get totalSumm() {
            return this.amount * this.price;
        } // общая стоимость выбранного продукта
    },
    cheeseburger: {
        name: 'CheeseBurger', // название бургера
        img: 'images/products/burger-3.png', // изображение бургера
        amount: 0, // кол-во
        price: 29000, // стоимость бургера
        get totalSumm() {
            return this.amount * this.price;
        } // общая стоимость выбранного продукта
    },
    dburger: {
        name: 'dBurger', // название бургера
        img: 'images/products/burger-4.png', // изображение бургера
        amount: 0, // кол-во
        price: 24000, // стоимость бургера
        get totalSumm() {
            return this.amount * this.price;
        } // общая стоимость выбранного продукта
    },

}; // объект который хранит все бургеры

const basketBtn = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');


basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active');
});

const closeBasketBtn = document.querySelector('.wrapper__navbar-close');

closeBasketBtn.addEventListener('click', () => {
    basketModal.classList.remove('active');
});

const productsBtns = document.querySelectorAll('.wrapper__list-btn');


productsBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});


function plusOrMinus(btn) { 
    
    const parent = btn.closest(".wrapper__list-card"); // Получение родителя
    const parentId = parent.getAttribute('id');
    products[parentId].amount++;
    basket();
}

const wrapperChackList = document.querySelector('.wrapper__navbar-checklist');  
const basketTotalSumm = document.querySelector('.wrapper__navbar-totalprice');
const basketBtnCount = document.querySelector('.warapper__navbar-count');

function basket() {
    const productsArray = [];
    for (const key in products) {
        let totalCount = 0;
        let pr = products[key];
        const productCard = document.querySelector(`#${pr.name.toLowerCase()}`);
        const productIndicator = productCard.querySelector('.wrapper__list-count');
        if (pr.amount) {
            productIndicator.classList.add('active');
            productIndicator.innerHTML = pr.amount;
            productsArray.push(pr);   
            totalCount += pr.amount;
            basketBtnCount.classList.add('active'); 
        } else {
            productIndicator.classList.remove('active');
            productIndicator.innerHTML = 0;
        }
    }
    wrapperChackList.innerHTML = '';
    console.log(productsArray);
    for (let i = 0; i < productsArray.length; i++) {
        wrapperChackList.innerHTML += createBurgerItem(productsArray[i]);
    } 

    basketTotalSumm.innerHTML = getTotalSumm();
    basketBtnCount.innerHTML = getTotalCount();
}

function createBurgerItem(productData) {

    const {name,totalSumm: price,img,amount} = productData;
    console.log(getTotalSumm());
    return `
        <div class="wrapper__navbar-product" id="${name.toLowerCase()}__card">
            <img class="wrapper__navbar-productImage" src="${img}">
                <div class="wrapper__navbar-infoSub">
                    <p>${name}</p>
                    <p>${price}</p>
                </div>
                <div class="wrapper__navbar-option">
                    <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
                    <output class="wrapper__navbar-count">${amount}</output>
                    <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
                </div>
    
        </div>
    `;
}

function getTotalSumm(){
    let summ = 0;
    for (const key in products) {
        summ += products[key].totalSumm;
    }
    return summ;
}

function getTotalCount(){
    let total = 0;
    for (const key in products) {
        total += products[key].amount;
    }
    return total;
}


window.addEventListener('click',(e)=>{
    const btn = e.target;
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const productId = btn.closest('.wrapper__navbar-product').getAttribute('id').split('__')[0];
        if (attr == '-') {
            products[productId].amount--;
        }else if(attr == '+') {
            products[productId].amount++;
        }
    }
    basket();
});

const basketCheckBtn = document.querySelector('.wrapper__navbar-bottom');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');


basketCheckBtn.addEventListener('click',()=>{

    printBody.innerHTML = '';

    for (const key in products) {
        const {name,totalSumm,amount} = products[key];

        if (amount) {
            printBody.innerHTML += `
                <div class ="print__body-item">
                    <p class="print__body-item_name">
                        <span class="name">${name}</span>
                        <span class="count">${amount}</span>
                    </p>  
                    <p class="print__body-item_sum">
                        ${totalSumm}
                    </p>
                </div>  
            `;  
        }
    }
    printFooter.innerHTML = getTotalSumm();

    window.print()
});

