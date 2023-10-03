let shop = document.querySelector("#shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      .map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
      <div id=product-id-${id} class="item">
          <img src=${img} alt="">
            <h3>${name}</h3>
            <p>${desc}</p>
            
            <div class="price-amnt">
              <h2 ><i class="bi bi-currency-rupee"></i> ${price} </h2>
              <div class="btn-amnt">
                    <button onclick="decreament(${id})" class="neg sign">-</button>
                    <div id=${id} class="amnt">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <button onclick="increament(${id})" class="pos sign">+</button>
              </div>
            </div>
        </div>
      `;
      })
      .join(""));
  };
  
  generateShop();

/*
    
*/

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
        if(search.item<50){
            search.item+=1;
        }else{
            alert("Maximum 50 pieces at a time!")
        }
        
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
        update(selectedItem,search.item);
        calculation();
    }
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
};
let update = (selectedItem,count)=>{
    selectedItem.innerHTML = count;
};

let calculation = ()=>{
    document.querySelector(".cart-num").innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y, 0);
}
calculation();
