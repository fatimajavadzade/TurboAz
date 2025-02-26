const menu = document.getElementById('menu')
const content = document.getElementById('content')
const select = document.querySelectorAll('#selects select')
const btnArtir = document.getElementById('btnArtir')
const marka = document.getElementById('marka')
const model = document.getElementById('model')
const city = document.getElementById('city')
const banType = document.getElementById('banType')
const likeDiv = document.getElementById('likeDiv')
const likeClose = document.getElementById('likeClose')
const yearMin = document.getElementById('yearMin')
const yearMax = document.getElementById('yearMax')

let markaArr = [...(new Set(data.map(item => { return item.brand })))]
let modelArr = [...(new Set(data.map(item => { return item.model })))]
let cityArr = [...(new Set(data.map(item => { return item.city })))]
let banTypeArr = [...(new Set(data.map(item => { return item.banType })))]

let flag = false
function openMenu () {
    menu.style.display = !flag ? 'flex' : 'none';
    flag = !flag;
}

let count = 8
function show() {
    if (data.length > 0) {
        content.innerHTML = ''
        data
            .slice(0, count)
            .map((item, i) => {
                content.innerHTML += `
                        <article class="flex flex-col bg-[#f1f3f7] rounded-[8px_8px_0_0]">
                            <div class="relative">
                                <img alt="car" class="object-cover w-full h-52 rounded-[8px_8px_0_0]" src="${item.images[0]}" />
                                    <i id="urek" onclick="addToWish(${item.id} , ${item.price} , '${item.currency} ', '${item.brand}' , '${item.model}', '${item.images[0]}', ${i} )"
                                    style="color:${item.status ? 'red' : 'white'}"
                                    class="fa-solid fa-heart absolute right-2 top-2 text-[22px] cursor-pointer"></i>
                            </div>
                            <div class="flex flex-col p-3">
                                <h3 class="pt-2 pb-[2px] text-[18px] font-[700]">${item.price} ${item.currency}</h3>
                                <span class="text-[16px] capitalize">${item.brand} ${item.model}</span>
                                <span class="text-[16px]">${item.year}, ${item.engine} L, ${item.odometer} ${item.odometerUnit}</span>
                                <div class="pt-1 text-sm">
                                    <span class="text-[#8d94ad]">${item.city}, ${item.dates}</span>
                                </div>
                            </div>
                        </article>
                     `
            })
    }else {
        btnArtir.style.display = 'none'
    }
}
show()

function filtr(axtar, select) {
    const yeniArr = copyData.filter(item => item[axtar] == select.value)
    data = yeniArr
    show()
}

// function likes(like, i) {
//     let likeArr = data.slice(i, i + 1);
//     if(like.style.color == 'white') {
//         likeArr.map(item => {
//             likeDiv.innerHTML += `
//                     <article class="flex flex-col bg-[#f1f3f7] rounded-[8px_8px_0_0] mt-3">
//                         <div class="relative">
//                             <img alt="car" class="object-cover w-full h-52 rounded-[8px_8px_0_0]" src="${item.images[0]}" />
//                         </div>
//                         <div class="flex flex-col p-3">
//                             <h3 class="pt-2 pb-[2px] text-[18px] font-[700]">${item.price} ${item.currency}</h3>
//                             <span class="text-[16px] capitalize">${item.brand} ${item.model}</span>
//                             <span class="text-[16px]">${item.year}, ${item.engine} L, ${item.odometer} ${item.odometerUnit}</span>
//                             <div class="pt-1 text-sm">
//                                 <span class="text-[#8d94ad]">${item.city}, ${item.dates}</span>
//                             </div>
//                         </div>
//                     </article>
//     `})
//     }
//     like.style.color = 'red'
// }

let basket  = []
function addToWish(id, price, currency, brand, model, images, index) {
    // data[index].status = true
    // show()
    const urek = document.querySelectorAll("#urek");
    urek[index].style.color = "red";
    const obj = { id, price, currency, brand, model, images, count: 1 };

    const yoxla = basket.find(item => item.id == id)
    // console.log(yoxla);

    if (yoxla == undefined) {
        basket.push(obj)
    } else {
        yoxla.count = yoxla.count + 1
    }

    showBasket()
}

function showBasket() {
    likeDiv.innerHTML = ""
    basket.forEach((item, index) => {
        // console.log(item);

        likeDiv.innerHTML += `
            <article class="flex flex-col mt-[10px] dark:bg-gray-50 relative">
                <div class="relative">
                    <div class="absolute right-[10px] top-[20px]">
                        <i 
                        onclick="deleteBasket(${item.id})"
                        class=" fa-solid fa-trash !text-[red]"></i>
                    </div>
                        <img alt="car" class="object-cover w-full h-52 rounded-[8px_8px_0_0] dark:bg-gray-500"
                            src="${item.images}" />
                    </div>
                <div class="flex flex-col flex-1 p-3">
                    <h3 class="flex-1 pt-2 pb-[2px] text-[18px] font-[700] leading-snug">${item.price} ${item.currency}</h3>
                    <h3 class="flex-1 pt-2 pb-[2px] text-[18px] font-[700] leading-snug"> 
                        <button onclick="basketAzalt(${index})"> - </button>
                           <span>${item.count}<span>
                        <button onclick="basketArtir(${index})"> + </button>
                    
                    </h3>
                    <span class="text-[16px] capitalize hover: dark:text-default-600">${item.brand} ${item.model}</span>
                </div>
            </article>
        
        `
    })
}

function hamisiniSil() {
    basket.length = 0;
    likeDiv.innerHTML = ""
}

function deleteBasket(id) {
    const yeniArr = basket.filter((item, i) => item.id !== id)
    basket = yeniArr;
    showBasket()
}

function basketArtir(index) {
    const element = basket[index]
    say = element.count + 1;
    element.count = say
    
    showBasket()
}

function basketAzalt(index) {
    const element = basket[index]
    let say = element.count - 1;
    if(say == 0){
        deleteBasket(  element.id )
    }else{
        element.count = say
    }
    showBasket()
}

function likeOpen() {
    likeClose.style.right = !flag ? '0%' : '100%'
    flag = !flag
}

function artir() {
    if (count < data.length) {
        count += 8
        if (count > data.length) btnArtir.style.display = 'none'
        show()
    }
}

function handleSelect() {
    markaArr.map(item => {
        marka.innerHTML += `<option>${item}</option>`
    })
    modelArr.map(item => {
        model.innerHTML += `<option>${item}</option>`
    })
    cityArr.map(item => {
        city.innerHTML += `<option>${item}</option>`
    })
    banTypeArr.map(item => {
        banType.innerHTML += `<option>${item}</option>`
    })
    for (let i = 2025; i >= 1905; i--) {
        yearMax.innerHTML += `<option>${i}</option>`
    }
    for(let i = 1905; i <= 2025; i++){
        yearMin.innerHTML += `<option>${i}</option>`
    }
}
handleSelect()

function etrafliAxtaris() {
    const marka = select[0].value
    const model = select[1].value
    const city = select[2].value
    const yeniArr = copyData.filter(item =>
        item.brand == marka && item.model == model && item.city == city
    )
    data = yeniArr
    show()
}

function sifirla() {
    data = copyData;
    show()
    // select.forEach(item => item.value = "")
    // console.log(select[0].children[2]);
}