let label =document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    document.querySelector(".cart-num").innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y, 0);
}
calculation();

let generateCartItems = ()=>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id,item} = x;
            let search = shopItemsData.find((y) => y.id === id);
            return `
                <div class="cart-item">
                    <img src=${search.img}>
                    <div class="details">
                        <div class="name-price-X">
                            <h2>${search.name}</h2>
                            <h3 class="price"><i class="bi bi-currency-rupee"></i> ${search.price}</h3>
                            <i onclick="removeItem(${id})" class="cross fa-solid fa-xmark" style="color: #fff;"></i>
                        </div>
                        <div class="btn-amnt btn-amnt-width">
                            <button onclick="decreament(${id})" class="neg sign">-</button>
                            <div id=${id} class="amnt">${item}</div>
                            <button onclick="increament(${id})" class="pos sign">+</button>
                        </div>
                        <div class="total-price btn-amnt">
                        <i class="bi bi-currency-rupee"></i> ${Number(item*search.price)}
                        </div>
                    </div>
                </div>
            `
        }).join(""))
    }else{
        label.innerHTML = `
            <h2>Cart is Empty!</h2>
            <a href="index.html">
            <button class="back-to-home">Back to Home</button>
            </a>
        `
    }
}



let increament = (id)=>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined){
        update(selectedItem,1);
        basket.push({
            id: selectedItem.id,
            item: 1
        })
        calculation();
    }else{
        search.item+=1;
        generateCartItems();
        update(selectedItem,search.item);
        calculation();
    }
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
};
let decreament = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined){
        alert("You don't have this product in your cart!");
        return ;
    }
   else{
        search.item-=1;
        basket = basket.filter((x)=> x.item !== 0);
        if(basket.length === 0){
            shoppingCart.innerHTML = "";
            clearCart();
        }
        
        
        update(selectedItem,search.item);
        calculation();
        generateCartItems();
    }
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
};
let update = (selectedItem,count)=>{
    selectedItem.innerHTML = count;
    totalAmnt();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    if(basket.length === 0){
        shoppingCart.innerHTML = "";
    }
    calculation();
    totalAmnt();
    generateCartItems();
}

let totalAmnt = ()=>{
    if(basket !==0){
        let amount = basket.map((x) => {
            let {id,item} = x;
            let search = shopItemsData.find((y)=> y.id === id);
            return search.price*item;
        }).reduce((x,y) => x+y,0);
        label.innerHTML = `
            <h2>Total amount : <i class="bi bi-currency-rupee"></i> ${amount}</h2>
            <button onclick="clearCart()" class="clear-cart">Clear cart</button>
        `
    }else{
       return ;
    }
}
totalAmnt();

let clearCart = ()=> {
    basket = [];
    localStorage.setItem("data",JSON.stringify(basket));
    shoppingCart.innerHTML = "";
    calculation();
    generateCartItems();
}









generateCartItems();