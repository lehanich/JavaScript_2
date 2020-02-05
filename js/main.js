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

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        searchLineTest: '',
        isVisibleCart: false,
    },
    computed:{
        searchLineTest: function(){
            return searchLine + " test"
        },
        filteredGoodsHandler(){
            // return  this.goods.filter((good) => {
            //         return regexp.test(good.product_name);
            //     });
            return debounce((event)=>{
                const regexp = new RegExp(event.target.value.trim(), 'i');
                console.log(this.searchLine)
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
    },
    computed: { // кешируемые методы, return обязателен
        upperCaseName() {
            return this.currentName.toUpperCase()
        }
    }
})
