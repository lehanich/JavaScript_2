const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

function debounce(callback,wait, immediate){
    let timeout;
    console.log("start debounce")
    return function() {
        const context = this
        const args = arguments;
        const later = function(){
            timeout = null
            if(!immediate) callback.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if(callNow){
            callback.apply(context, args)
        }
    }
}

Vue.component('goods-item', {
    props: ['good'],
    methods:{
        addToCart(e){
            //console.dir(e.target)
            console.log("goods-item: add to cart")
            this.$emit('add-To-Cart', e.target.dataset.id)
        }
    },
    template: `
        <div class="goods-item"  >
                <div class="pImage">
                    <img src="https://via.placeholder.com/250" alt="alt">
                </div>
                <h3>{{ good.product_name }}</h3>
                <p class="price">{{ good.price }}</p>
                <button @click="addToCart($event)" name="btn-buy" :data-id="good.id_product"  class="js-add-to-cart btn-buy">Добавить</button>
        </div>
    `
});

Vue.component('goods-list', {
    props: [`goods`],
    computed: {
        isFilteredGoodsEmpty() {
            return this.goods.length === 0;
        },
    },
    methods: {
        addToCart(id){
            console.log("goods-list: add to cart")
            console.log("goods-list: " + id)
            this.$emit('add-to-cart', id)
        }
    },
    template:`
        <div class="goods-list" >
            <goods-item v-for="good in goods" :key="good.id_product" :data-id="good.id_product" :good="good" @add-To-Cart="addToCart"></goods-item>
        
            <div class="goods-not-found" v-if="isFilteredGoodsEmpty" >
                <h3>Нет данных</h3>
            </div>
        </div>
        
    `
});

Vue.component('search-form', {
    props: [`goods`],
    data:()=>({
        searchLine: '',
    }),
    computed: {
    },
    template:`
        <form id="searchForm" action=""><!-- Test Computed <h2>{{ searchLineTest }}</h2>-->
                <input type="search" class="search-button" @input="$emit('input', $event.target.value)"  >
        </form><!--@input="filteredGoodsHandler" v-model.trim="searchLine" -->
    `
})


Vue.component('cart-form', {
    props: [`goods`],
    data:()=>({
        searchLine: '',
        isVisibleCart: false,
        cartItems: [],
    }),
    methods: {
        cartVisibility(){
            this.isVisibleCart = !this.isVisibleCart;
            console.log(this.goods)
        },
        addToCart(id){
            cartItems.push(id)
            console.log(cartItems)
        }
    },
    template: `
        <form id="cart-form" class="cart-form" action="">
                <input type="button" name="cart-button" class="cart-button" @click="cartVisibility">
                <transition name="fade">
                    <span class="total-price" v-if="!isVisibleCart">0</span>
                    <div class="cart-block" v-if="isVisibleCart">
                        <div v-for="good in goods">
                            {{good}}
                        </div>
                    </div>
                </transition>
            </form>
    `
})

Vue.component('alert-window', {
    props: {
        message: "",
        isVisible: false,
    },
    template:`
        <div class="allertMessage">Ошибка: <slot></slot></div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        msgError: '',
        filteredGoodsCart: [],
    },
    computed: {
        filteredGoodsHandler(){
            // return  this.goods.filter((good) => {
            //         return regexp.test(good.product_name);
            //     });
            return debounce((event)=>{
                const regexp = new RegExp(this.searchLine.trim(), 'i');//event.target.value
                console.dir(this.searchLine)
                this.filteredGoods = this.goods.filter((good) => {
                    return regexp.test(good.product_name);
                });
            },300)
        },
        visibleError(){
            return this.msgError.length !== 0
        },
        filteredGoodsCartHandler(){
            return this.filteredGoodsCart
        }
    },
    methods: {
        makeGetRequest(url) {
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
        },
        async fetchGoods() {//callback
            try{
                this.goods = await this.makeGetRequest(`${API_URL}/catalogData.json`) //async makeGetRequest
                this.filteredGoods = [...this.goods]
            }catch(e){
                //console.error(e)
                this.showError("Нет соединения с сервером")
            }

        },
        showError(){
            this.msgError = "Нет соединения с сервером"

            //  debounce(()=>{
            //     console.log("test")
            //     this.msgError = ""
            //     console.log(this.msgError)
            // }, 3000)
            // console.log(this.msgError)
            // console.log(test)
            
            setTimeout(() => this.msgError = "" , 3000);
        },
        addToCart(id) {
            console.log("app: add to cart")
            this.filteredGoodsCart.push(id)
            console.log(this.filteredGoodsCart)
        }
        
    },
    mounted() { //приложение монтируется
        this.fetchGoods();
    }

})
