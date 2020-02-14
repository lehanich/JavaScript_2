//const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const API_URL = "/data/"

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
                    <img :src="good.img" alt="alt">
                </div>
                <h3>{{ good.name }}</h3>
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
    props: [`goods`, `filteredGoods`],
    data:()=>({
        searchLine: '',

    }),
    computed: {
        filteredGoodsHandler(){
            // return  this.goods.filter((good) => {
            //         return regexp.test(good.product_name);
            //     });
            return debounce((event)=>{
                console.dir(event.target.value)
                const regexp = new RegExp(event.target.value.trim(), 'i');//event.target.value
                const filteredGoods = this.goods.filter((good) => {
                    return regexp.test(good.name);
                });
                console.dir(filteredGoods)
                this.$emit('update.filteredGoods', filteredGoods)
            },300)
        },
    },
    template:`
        <form id="searchForm" action=""><!-- Test Computed <h2>{{ searchLineTest }}</h2>-->
                <input type="search" class="search-button" @input="filteredGoodsHandler"   >
        </form><!--@input="filteredGoodsHandler" @input="$emit('input', $event.target.value)" v-model.trim="searchLine" -->
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

 Vue.component('alert-window', {
    props: {
        error: "",
        isVisible: false,
        wait: 5000
    },
    computed:{
        showEr(){
            return this.error != null && this.error != ""
        }
    },
    methods: {
        showError(error){
            console.dir(error)
            this.error = error          
            setTimeout(() => this.clear() , this.wait);
        },
        clear(){
            this.error = null
        }

    },
    template:`
        <transition name="fade">
            <div class="allertMessage" v-if="showEr">Ошибка: {{ error.message }}</div>
        </transition>
    `
})

const homePage = Vue.component('home-page', {
    template:` <goods-list :goods="filteredGoods" />  `,
    data: () => ({
        goods: [],
        filteredGoods: [],
    }),
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
                this.goods = await this.makeGetRequest(`/api/goods`) //async makeGetRequest  `${API_URL}catalog.json`
                this.filteredGoods = [...this.goods]
            }catch(e){
                //console.error(e)
                this.$refs.notification.showError(new Error(e))
                //this.showError("Нет соединения с сервером")
            }

        },
        
        
    },
    mounted() { //приложение монтируется
        this.$nextTick(() => {
            this.fetchGoods();
        })   
    }
})

const contactPage = Vue.component('contact-page', {
    template: `<h1>Контакты</h1>`
})

const routes = [
    {
        name: 'home',
        path: "/",
        component: homePage
    },
    {
        name: 'contacts',
        path: "/contacts",
        component: contactPage
    }
];

const router = new VueRouter({
    mode: `history`, //убирает /#/ в адресе в браузере
    routes
})

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
})

const app = new Vue({
    el: '#app',
    router,
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        msgError: '',
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
        }
    },
    

})
