class Gamburger{
    constructor(name="",price=0,calory=0){
        this.name = name
        this.price = price
        this.calory = calory
        this.addins = [];
    }
    addAddin(addin){
        this.addins.push(addin)
    }
    totalCalory(){
        let valTotalCalory = this.calory
        this.addins.forEach(addin=>{
            valTotalCalory += addin.calory
        })
        return valTotalCalory
    }
    totalPrice(){
        let valTotalPrice = this.price
        this.addins.forEach(addin=>{
            valTotalPrice += addin.price
        })
        return valTotalPrice
    }
}

class Addin{
    constructor(name="",type="",price=0,calory=0){
        this.name = name
        this.type = type
        this.price = price
        this.calory = calory
    }
}

gamburger1 = new Gamburger("Маленький", 50, 20)
gamburger2 = new Gamburger("Большой", 100, 40)

console.dir(gamburger1)
console.dir(gamburger2)

gamburger1.addAddin(new Addin("Сыр","Начинка",10,20))
gamburger2.addAddin(new Addin("Салат","Начинка",20,5))
gamburger1.addAddin(new Addin("Картофель","Начинка",15,10))
gamburger2.addAddin(new Addin("Приправа","Приправа",15,0))
gamburger1.addAddin(new Addin("Майонез","Соус",20,5))

console.dir(gamburger1)
console.dir("гпмбургер 1 цена:" + gamburger1.totalPrice() + " калории:" + gamburger1.totalCalory())
console.dir(gamburger2)
console.dir("гпмбургер 2 цена:" + gamburger2.totalPrice() + " калории:" + gamburger2.totalCalory())