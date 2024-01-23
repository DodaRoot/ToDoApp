// Login Input
let usernameForm = document.querySelector('#username')
let passwordForm = document.querySelector('#password')
// Add Item Button
let itemBtn = document.querySelector('.listContent button')
// Modal and other hide and show comp
let listContainer = document.querySelectorAll('.userLists .contain .card')
let itemContainer = document.querySelectorAll('.listContent .contain div')
let modal = document.querySelector('.modal')
let userItems = document.querySelector('.listContent')
let userLists = document.querySelector('.userLists')
let addNewBtn = document.querySelector('.userLists button')
let span = document.querySelector('.modalContainer')
let spanItem = document.querySelector('.modalContainerItem')
let list = document.querySelectorAll('.card')
let profile = document.querySelector('.profile h5')
let profileContainer = document.querySelector('.profile .profileCont')
let fileInput = document.querySelector('#fileInput')

let mainObj = {
    0 : {
        0 : 'John' ,
        1 : '12345' ,
        2 : 'None' ,
        3 : [
            [
                'List One' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
            [
                'List Two' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
            [
                'List Three' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
        ],
    } ,
    1 : {
        0 : 'Doda' ,
        1 : '12345' ,
        2 : 'None' ,
        3 : [
            [
                'List One' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
            [
                'List Two' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
            [
                'List Three' ,
                [
                    [
                        'Item One' , 'Time To Do It'
                    ],
                    [
                        'Item Two' , 'Time To Do It'
                    ]
                ]
            ],
        ],
    } ,
}

if (localStorage.getItem('mainObj') == null) {
    localStorage.setItem('mainObj' , JSON.stringify(mainObj))
    localObj = JSON.parse(localStorage.getItem('mainObj'))
}
else {
    localObj = JSON.parse(localStorage.getItem('mainObj'))
}

// CHECKING IF USER IS LOGGED IN AND SWITCHING THE PAGE
let logged = localStorage.getItem('LOGGED')
if (logged && document.URL.includes("index.html")) {
    location.replace('list.html')
}
if (logged && document.URL.includes("list.html")) {
    for (let list in localObj[logged][3] ) {
        appending(list , localObj[logged][3][list] , false)
    }
}

profile.innerText = localObj[logged][0]

let profileImg = document.querySelector('.profile img')
let profileBtn = document.querySelector('.profile button')
profileContainer.addEventListener('click' , () => {
    fileInput.click()
    profileBtn.style.display = 'flex'
})

profileBtn.addEventListener('click' , () => {
    let reader = new FileReader;
    reader.readAsDataURL(fileInput.files[0])
    reader.addEventListener('load' , () => {
        let data = reader.result
        let old_data = JSON.parse(localStorage.getItem('mainObj'))
        old_data[logged][2] = data
        localStorage.setItem('mainObj' , JSON.stringify(old_data))
        location.reload()
    })
})

if (localObj[logged][2] != 'None') {
    profileImg.src = localObj[logged][2]
}

function signin () {
    event.preventDefault()
    let user = usernameForm.value
    let pass = passwordForm.value
    for (let index in localObj) {
        if (user == localObj[index][0] && pass == localObj[index][1]) {
            localStorage.setItem('LOGGED' , index)
            alert('Welcome ' + user)
            location.reload()
            break;
        }
        else if (user == localObj[index][0]) {
            alert('User exists but password is wrong')
            break;
        }
        else if (index == Object.keys(localObj).length - 1){
            alert('User does not exist')
        }
    }
}

function signup() {
    event.preventDefault()
    let user = usernameForm.value
    let pass = passwordForm.value
    // Setting up the new data
    let new_data = { 0 : user , 1 : pass , 2 : 'None' , 3 : []}
    // Getting the value from obj and setting to temp value
    let old_data = JSON.parse(localStorage.getItem('mainObj'))
    // Getting the index of the temp obj
    let index = (Object.keys(old_data).length)
    // Setting the new value to temp obj
    old_data[index] = new_data
    // Making the temp obj the primary obj
    localStorage.setItem('mainObj' , JSON.stringify(old_data))
    location.reload()
}

function signout() {
    localStorage.removeItem('LOGGED')
    location.replace('index.html')
}

function addNewList() {
    // Setting up the new data
    event.preventDefault()
    span.style.display = 'none'
    let listName = document.querySelector('#listName').value
    let new_data = [listName , []]
    // Getting the value from obj and setting to temp value
    let old_data = JSON.parse(localStorage.getItem('mainObj'))
    // Setting the new value to temp obj
    old_data[logged][3].push(new_data)
    // Getting the index of the temp obj
    let index = Object.keys(old_data[logged][3]).length
    // Making the temp obj the primary obj
    localStorage.setItem('mainObj' , JSON.stringify(old_data))        
    localObj = JSON.parse(localStorage.getItem('mainObj'))
    // Appending the list
    appending(index - 1 , localObj[logged][3][index - 1] , true)
}

let cardLocation = null

function appending(index , ref , animation) {
    let contain = document.querySelector('.contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 0.5s ease-in-out' : false ;
    let title = document.createElement('div')
    title.setAttribute('class' , 'title')
    title.innerText = ref[0]
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(deleted)
    card.addEventListener('click' , (x) => {
        if (x.target != deleted) {
            itemBtn.style.display = 'flex'
        }
        cardLocation = index
        card.style.margin = '2.5% 0 0px 4.5%'
        hideItems()
        localObj = JSON.parse(localStorage.getItem('mainObj'))
        ref = localObj[logged][3][index]
        for (let item in ref[1]) {
            if (x.target != deleted) {
                let info = localObj[logged][3][index][1][item]
                info != undefined ? appendingItem(info , false) : false ;
            }

        }
    })
    deleted.addEventListener('click' , () => {
        for(let [i , item] of listContainer.entries()) {
            if (item == card) {
                card.style.animation = 'fadeOut 0.3s ease-in-out'
                setTimeout(() => {
                    card.remove()
                    let old_data = JSON.parse(localStorage.getItem('mainObj'))
                    old_data[logged][3].splice(i , 1)
                    localStorage.setItem('mainObj' , JSON.stringify(old_data))
                    localObj = JSON.parse(localStorage.getItem('mainObj'))
                    listContainer = document.querySelectorAll('.userLists .contain .card')
                } , 200)
                break;
            }
        }
        
    })
    listContainer = document.querySelectorAll('.userLists .contain .card')
    list = document.querySelectorAll('.card')
    localObj = JSON.parse(localStorage.getItem('mainObj'))
    addHideShow()
}

function addNew () {
    span.style.display = 'flex'
}

// Getting present date

function addNewItem() {
    event.preventDefault()
    spanItem.style.display = 'none'
    let item = document.querySelector('#itemName').value
    let timeInput = document.querySelector('#dateInfo').value
    let timeArr = timeInput.split('-')
    timeCalc(timeArr)
    // let new_data = [item , time]
    // // Getting the value from obj and setting to temp value
    // let old_data = JSON.parse(localStorage.getItem('mainObj'))
    // // Setting the new value to temp obj
    // old_data[logged][3][cardLocation][1].push(new_data)
    // // Getting the index of the temp obj
    // let index = Object.keys(old_data[logged][3][cardLocation][1]).length
    // // Making the temp obj the primary obj
    // localStorage.setItem('mainObj' , JSON.stringify(old_data))        
    // localObj = JSON.parse(localStorage.getItem('mainObj'))
    // appendingItem(old_data[logged][3][cardLocation][1][index - 1] , true)
}
function timeCalc (timeArr) {
    let date = new Date()
    let dateYear = date.getFullYear()
    let dateDay = date.getDate()
    let dateMonth = date.getUTCMonth() + 1
    let dateHours = date.getHours()
    let dateMinutes = date.getMinutes()
    let timeYear = parseInt(timeArr[0])
    let timeDay = parseInt(timeArr[2].split('T')[0])
    let timeMonth = parseInt(timeArr[1])
    let timeHours = parseInt(timeArr[2].split('T')[1].split(':')[0])
    let timeMinutes = parseInt(timeArr[2].split('T')[1].split(':')[1])
    if (dateYear > timeYear) {
        console.log('invalid date')
    }
    else if (dateYear == timeYear && dateMonth > timeMonth) {
        console.log('invalid date')
    }
    else if (dateMonth == timeMonth && dateDay > timeDay) {
        console.log('invalid date')
    }
    else if (dateDay == timeDay && dateHours > timeHours) {
        console.log('invalid date')
    }
    else if (dateHours == timeHours && dateMinutes > timeMinutes) {
        console.log('invalid date')
    }
    else {
        console.log('request accepted')
    }
}


function appendingItem(ref , animation) {
    let contain = document.querySelector('.listContent .contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 0.5s ease-in-out' : false ;
    let title = document.createElement('div')
    title.setAttribute('class' , 'title')
    ref != null ? title.innerText = ref[0] : false;
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(deleted)
    deleted.addEventListener('click' , () => {
        for(let [index , item] of itemContainer.entries()) {
            if (item == card) {
                card.style.animation = 'fadeOut 0.3s ease-in-out'
                setTimeout(() => {
                    card.remove()
                    let old_data = JSON.parse(localStorage.getItem('mainObj'))
                    old_data[logged][3][cardLocation][1].splice(index , 1)
                    localStorage.setItem('mainObj' , JSON.stringify(old_data))
                    localObj = JSON.parse(localStorage.getItem('mainObj'))
                    itemContainer = document.querySelectorAll('.listContent .contain .card')
                } , 200)
                break;
            }
        }
        
    })
    itemContainer = document.querySelectorAll('.listContent .contain .card')
}

function addNewItemBtn() {
    spanItem.style.display = 'flex'
}

// Making the add new list modal
function hideItems() {
    for(let item of itemContainer) {
        item.remove()
    }
}

// Adding show and hide item add functionality
function addHideShow() {
    window.addEventListener('click' , (x) => {
        for (let card of list) {
            if (x.target == userLists && x.target != card) {
                itemBtn.style.display = 'none'
                hideItems()
            }
            if (x.target != userItems && x.target != card) {
                card.style.margin = '2.5% 0 0 2.5%'
            }
        }
    })
}
window.addEventListener('click' , (x) => {
    if (x.target == span) {
        span.style.display = 'none'
    }
    if (x.target == spanItem) {
        spanItem.style.display = 'none'
    }
})

function showModal () {
    let container = document.createElement('div')
    container.setAttribute('class' , 'popupContainer')
    let modal = document.createElement('div')
    modal.setAttribute('class' , 'popupModal')
    let head = document.createElement('h4')
    let text = document.createElement('p')
    document.body.append(container)
    container.append(modal)
    modal.append(head)
    modal.append(text)
}
showModal()
addHideShow()