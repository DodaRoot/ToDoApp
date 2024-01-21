// Login Input
let usernameForm = document.querySelector('#username')
let passwordForm = document.querySelector('#password')
// Add Item Button
let itemBtn = document.querySelector('.listContent button')
// Modal and other hide and show comp
let itemContainer = document.querySelectorAll('.listContent .contain div')
let modal = document.querySelector('.modal')
let userLists = document.querySelector('.userLists')
let addNewBtn = document.querySelector('.userLists button')
let span = document.querySelector('.modalContainer')
let spanItem = document.querySelector('.modalContainerItem')
let list = document.querySelectorAll('.card')

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
        appending(list , localObj , false)
    }
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
    let new_data = { 0 : user , 1 : pass , 2 : 'None'}
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
    let new_data = [listName]
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
    appending(index - 1 , old_data , true)
}

let cardLocation = null;
function appending(index , ref , animation) {
    let contain = document.querySelector('.contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 1s' : false ;
    let title = document.createElement('div')
    title.setAttribute('class' , 'title')
    title.innerText = ref[logged][3][index][0]
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(deleted)
    card.addEventListener('click' , (x) => {
        if (x.target == card && x.target != deleted) {
            itemBtn.style.display = 'flex'
        }
        cardLocation = index
        card.style.margin = '2.5% 0 0px 4.5%'
        hideItems()
        for (let item in ref[logged][3][index][1]) {
            console.log(ref[logged][3][index][1][item][0])
            appendingItem(item , localObj , false)
        }
    })
    deleted.addEventListener('click' , () => {
        card.style.display = 'none'
        let old_data = JSON.parse(localStorage.getItem('mainObj'))
        old_data[logged][3].splice(index , 1)
        localStorage.setItem('mainObj' , JSON.stringify(old_data))
        location.reload()
    })
    list = document.querySelectorAll('.card')
    addHideShow()
}

function addNew () {
    span.style.display = 'flex'
}

function addNewItem() {
    event.preventDefault()
    spanItem.style.display = 'none'
    let item = document.querySelector('#itemName').value
    let new_data = [item , 2.50]
    // Getting the value from obj and setting to temp value
    let old_data = JSON.parse(localStorage.getItem('mainObj'))
    // Setting the new value to temp obj
    old_data[logged][3][cardLocation].push(new_data)
    // Getting the index of the temp obj
    let index = Object.keys(old_data[logged][3]).length
    // Making the temp obj the primary obj
    localStorage.setItem('mainObj' , JSON.stringify(old_data))        
    localObj = JSON.parse(localStorage.getItem('mainObj'))
    appendingItem(index - 1 , localObj , true)
}

function appendingItem(index , ref , animation) {
    let contain = document.querySelector('.listContent .contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 1s' : false ;
    let title = document.createElement('div')
    title.setAttribute('class' , 'title')
    title.innerText = ref[logged][3][index][0]
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(deleted)
    card.addEventListener('click' , (x) => {

    })
    deleted.addEventListener('click' , () => {
        card.style.display = 'none'
        let old_data = JSON.parse(localStorage.getItem('mainObj'))
        old_data[logged][3][cardLocation].splice(index , 1)
        localStorage.setItem('mainObj' , JSON.stringify(old_data))
        location.reload()
    })
    itemContainer = document.querySelectorAll('.listContent .contain .card')
}

function addNewItemBtn() {
    spanItem.style.display = 'flex'
}

// Making the add new list modal
function hideItems() {
    for(let item of itemContainer) {
        item.style.display = 'none'
    }
}

// Adding show and hide item add functionality
function addHideShow() {
    for (let card of list) {
        window.addEventListener('click' , (x) => {
            if (x.target == userLists && x.target != card) {
                itemBtn.style.display = 'none'
                hideItems()
            }
            if (x.target != card) {
                card.style.margin = '2.5% 0 0 2.5%'
            }
        })
    }
}
addHideShow()