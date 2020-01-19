const goods = [
    { title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
    { title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
    { title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
    { title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
];

const renderGoodsItem = (title, price, img = '') => {
    return `<div class="goods-item">
        <div class="pImage">
            <img src="${img}" alt="alt">
        </div>
        <a class="product_item_link" href="#"><h3>${title}</h3></a>
        <p class="price">${price}</p>
        <div class="button-block"><button class="btn-buy" name="btn-buy" data-product="0">Купить</button></div>
    </div>`
};

const renderGoodsList = (list, container) => {
    const goodsList = list.map(good => renderGoodsItem(good.title, good.price, good.img));
    document.querySelector(container).innerHTML = goodsList;
};

renderGoodsList(goods, '.goods-list');
