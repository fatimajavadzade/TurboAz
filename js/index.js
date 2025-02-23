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
                                    <i id="urek${i}" onclick="likes(this, ${i})" class="fa-solid fa-heart absolute right-2 top-2 text-[22px] cursor-pointer" style="color: white;"></i>
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

function likes(like, i) {
    let likeArr = data.slice(i, i + 1);
    if(like.style.color == 'white') {
        likeArr.map(item => {
            likeDiv.innerHTML += `
                    <article class="flex flex-col bg-[#f1f3f7] rounded-[8px_8px_0_0] mt-3">
                        <div class="relative">
                            <img alt="car" class="object-cover w-full h-52 rounded-[8px_8px_0_0]" src="${item.images[0]}" />
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
    `})
    }
    like.style.color = 'red'
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