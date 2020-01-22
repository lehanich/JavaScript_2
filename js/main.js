class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = '') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id}">
                <div class="pImage">
                    <img src="${this.img}" alt="alt">
                </div>
                <h3>${this.title}</h3>
                <p class="price">${this.price}</p>
                <button name="btn-buy"  class="js-add-to-cart btn-buy">Добавить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
    }
    fetchGoods() {
        this.goods = [
            {id: 1, title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/250'},
            {id: 2, title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/250'},
            {id: 3, title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/250'},
            {id: 4, title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/250'},
            {id: 5, title: "Посудомоечная машина bosh", price: 26000, img: 'https://via.placeholder.com/250'},
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
    totalPrice(){
        let totalPrice = 0;
        this.goods.forEach(good=>{
            totalPrice += good.price;
        })
        return totalPrice;
    }
}

const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();
console.log("total price " + list.totalPrice())
///

class CartItem extends GoodsItem {
    count = 0;

    renderCartFly(){

    }

    renderCartPage(){

    }
}

class Cart{
    items = [];
    containerCartFly = "";


    constructor() {

    }

    addItem(){

    }

    deleteItem(){

    }

    totalPrice(){

    }

    totalCount(){

    }

    renderItemsFlyBlock(){

    }

}

///


// const goods = [
//     { title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
//     { title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
//     { title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
//     { title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
// ];

// const renderGoodsItem = (title, price, img = '') => {
//     return `<div class="goods-item">
//         <div class="pImage">
//             <img src="${img}" alt="alt">
//         </div>
//         <a class="product_item_link" href="#"><h3>${title}</h3></a>
//         <p class="price">${price}</p>
//         <div class="button-block"><button class="btn-buy" name="btn-buy" data-product="0">Купить</button></div>
//     </div>`
// };

// const renderGoodsList = (list, container) => {
//     const goodsList = list.map(good => renderGoodsItem(good.title, good.price, good.img));
//     document.querySelector(container).innerHTML = goodsList;
// };

// renderGoodsList(goods, '.goods-list');