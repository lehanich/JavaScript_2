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
    template: `
        <div class="goods-item"  >
                <div class="pImage">
                    <img src="https://via.placeholder.com/250" alt="alt">
                </div>
                <h3>{{ good.product_name }}</h3>
                <p class="price">{{ good.price }}</p>
                <button name="btn-buy" :data-id="good.id_product"  class="js-add-to-cart btn-buy">Добавить</button>
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
    template:`
        <div class="goods-list" >
            <goods-item v-for="good in goods" :key="good.id_product" :data-id="good.id_product" :good="good"></goods-item>
        
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
        isVisibleCart: false
    }),
    methods: {
        cartVisibility(){
            this.isVisibleCart = !this.isVisibleCart;
        }
    },
    template: `
        <form id="cart-form" class="cart-form" action="">
                <input type="button" name="cart-button" class="cart-button" @click="cartVisibility">
                <transition name="fade">
                    <span class="total-price" v-if="!isVisibleCart">0</span>
                    <div class="cart-block" v-if="isVisibleCart"></div>
                </transition>
            </form>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
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
        }
    },
    methods: {
        // filteredGoodsHandler(){
        //     return debounce((event)=>{
        //         const regexp = new RegExp(event.target.value.trim(), 'i');
        //         console.log(this.searchLine)
        //         this.filteredGoods = this.goods.filter((good) => {
        //             return regexp.test(good.product_name);
        //         });
        //     },300)

            
        // },
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
                console.error(e)
            }
            // return makeGetRequest(`${API_URL}/catalogData.json`).then((goods) => {
            //     this.goods = goods;
            //     //callback();
            // }).catch(e => console.error(e));
        },
        // filterGoods() {
        //     const regexp = new RegExp(this.searchLine, 'i');
        //     this.filteredGoods = this.goods.filter((good) => {
        //         return regexp.test(good.product_name);
        //     });
        // }
        
    },
    mounted() { //приложение монтируется
        this.fetchGoods();
    }

})
