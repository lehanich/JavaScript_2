const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const goodsInCart = []

const makeGetRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else  {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
        }
            
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200){
                    reject(xhr.responceText)
                }
            
                const body = JSON.parse(xhr.responseText)
                resolve(body)
    
            }
        };
        xhr.onerror = function(err){
            reject(err)
        }
        xhr.open('GET', url);
        xhr.send();

    })
};


class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = 'https://via.placeholder.com/250') {
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
        this.filteredGoods = [];
        this.initCommonListeners();
    }
    initCommonListeners(){
    }
    initListeners() {}
    findGood(id) {
        //console.log(this.goods)
        //console.log(this.filteredGoods)
        //return this.goods.find(good => good.id_product === id);
        return this.goods[id]
    }
    fetchGoods() {

    }
    totalSum() {
        let sum = 0;
        for (const good of this.goods) {
            if (good.price) {
                sum += good.price;
            }
        }
        return sum;
        // return this.goods.reduce((totalPrice, good) => {
        //     if (!good.price) return totalPrice;
        //     totalPrice += good.price;
        //     return totalPrice;
        // }, 0)
    }
    render() {
        let listHtml = '';
        this.filteredGoods.forEach((good, index) => {
            const goodItem = new GoodsItem(index, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        console.log(this.filteredGoods)
        this.container.innerHTML = listHtml;
        this.initListeners();
        
    }
    
}

class GoodsPage extends GoodsList {
    initCommonListeners(){
        const searchForm = document.querySelector('#searchForm');
        const searchValue = searchForm.querySelector('.search-button');
        // searchValue.addEventListener('search', (e) => {
        //     console.log("Serch 22")
        //     e.preventDefault();
        //     let value = searchValue.value;
        //     value = value.trim();
        //     this.filterGoods(value);
        // });
        searchForm.addEventListener('submit', (e) => {
                console.log("Serch 22")
                e.preventDefault();
                let value = searchValue.value;
                value = value.trim();
                this.filterGoods(value);
            });

    }
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                console.log(goodId)
                this.addToCart(parseInt(goodId, 10));
            })
        })

        console.log("check init listeners in GoodsList")
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter((good) => {
            return regexp.test(good.product_name);
        });
        this.render();
    }
    fetchGoods(callback) {
        // try {
        //     this.goods = await makeGetRequest(`${API_URL}/catalogData.json`);
        //     this.filteredGoods = [...this.goods];
        // } catch (e) {
        //     console.error(`Ошибка: ${e}`)
        // }
        return makeGetRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = goods;
            this.filteredGoods = [...this.goods];
            //callback();
        }).catch(e => console.error(e));
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
        cart.addItem(good);
    }
}

class Cart extends GoodsList {
    // constructor(...attrs) {
    //     super(attrs);
    //     this.count = 0;
    // }
    constructor(container, containerList) {
        super(container)
        //this.goods = []
        //this.container = document.querySelector(container);//!!! super() не сработал, пришлось повторно определять
        this.containerList = document.querySelector(containerList);
        this.containerVal = container;
        this.initListeners()
        console.log(this.container)
    }
    initListeners(){
        this.container.addEventListener("click", (event)=>{
            //console.log(event.target.name)
            if(event.target.name === "cart-button"){
                console.log(event.target.name)
                this.containerList.classList.toggle("show")
                document.querySelector(this.containerVal + " .total-price").classList.toggle("hide")
            }
        })
        this.containerList.addEventListener("click", (event)=>{
            if(event.target.name === "cart-button"){
                console.log("click button")
                this.containerList.classList.toggle("show")
                document.querySelector(this.containerVal + " .total-price").classList.toggle("hide")

            }
            if(event.target.name === "btn-del"){ //!!! почему срабатывает 2 раза?
                console.log(event.target.dataset.product)
                this.removeFromCart(event.target.dataset.product)
            }
        })
    }
    removeFromCart(goodId) {
        console.dir(goodsInCart);
        let findId = goodsInCart.findIndex(good => good.id == goodId);
        if(findId >=0 ){
            goodsInCart.splice(findId, 1);
        }
        //console.log(goodId);
        console.log(findId);
        console.dir(goodsInCart);
        this.render()
        
    }
    cleanCart() {

    }
    updateCartItem(goodId, goods) {
        
    }
    addItem(element){
        let cartItem = new CartItem(element.id_product,element.product_name,element.price,'https://via.placeholder.com/50');
        let findId = goodsInCart.findIndex(good => good.id === cartItem.id);
        console.log(findId)
        if(findId<0){
            findId = goodsInCart.push(cartItem)
            findId--
        }
        goodsInCart[findId].count ++
        console.log(goodsInCart)
        this.render()
    }
    totalPrice(){
        let totalPrice = 0;
        goodsInCart.forEach(good => {
            totalPrice += good.price * good.count
        })
        return totalPrice;
    }
    render() {
        let listHtml = '';
        goodsInCart.forEach(good => {
            const goodItem = new CartItem(good.id, good.title, good.price, good.img);
            goodItem.incCount( good.count)
            listHtml += goodItem.render();
        });
        listHtml += `
            <div class="total-price-fly">
                <span>Итоговая сумма</span>
                <span class="price">${this.totalPrice()}</span>
            </div>
        `
        this.containerList.innerHTML = listHtml;
        document.querySelector(this.containerVal + " .total-price").innerHTML = this.totalPrice()

    }
}

class CartItem extends GoodsItem {
    constructor(...attrs) {
        super(...attrs);
        console.log(this.id)
        this.count = 0;
    }
    incCount(count) {
        (count) ? this.count = count : this.count ++ 
    }
    decCount() {
        (this.count > 0) ? this.count -- : this.count
    }
    render(){
        return  `
            <div class="cart-item">
                <div class="cart-image">
                    <img  src="${this.img}" alt="${this.title}">
                </div>
                <div class="cart-info">
                    <span class="cart-info-name">${this.title}</span>
                    <i>${this.price}</i> x 
                    <i>${this.count}</i>шт
                </div>
                <input type="button" class="btn-del" name="btn-del" data-product="${this.id}" value="Del">
                <!--<div class="catalog-link">
                    <a href="catalog/product1.html">Бумага</a>
                </div>-->
            </div>
        `
    }
}

let cart = new Cart('.cart-form', '.cart-block');

const list = new GoodsPage('.goods-list');
list.fetchGoods().then(() => {
    list.render();
}).catch((err) => {
    console.error(err)
})

// => {
//     list.render();
// });

console.log(list.totalSum());
