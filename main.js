// Login Input
let usernameForm = document.querySelector('#username')
let passwordForm = document.querySelector('#password')
// Add Item Button
let itemBtn = document.querySelector('.listContent button')
// Links To The DOM
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
let doneContainer = document.querySelectorAll('.doneTasks .contain .card')

let mainObj = {
    0 : {
        0 : 'John' ,
        1 : '12345' ,
        2 : 'None' ,
        3 : [
        ],
    } ,
    1 : {
        0 : 'Doda' ,
        1 : '12345' ,
        2 : 'None' ,
        3 : [
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

let logged = localStorage.getItem('LOGGED')
if (logged && document.URL.includes("index.html")) {
    location.replace('list.html')
}
if (logged && document.URL.includes("list.html")) {
    for (let list in localObj[logged][3] ) {
        appending(list , localObj[logged][3][list] , false)
    }
}

if (document.URL.includes('list.html')) {
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
}   

function signin () {
    event.preventDefault()
    let user = usernameForm.value
    let pass = passwordForm.value
    for (let index in localObj) {
        if (user == localObj[index][0] && pass == localObj[index][1]) {
            localStorage.setItem('LOGGED' , index)
            showModal('Success' , `Welcome ${user}` , true)
            break;
        }
        else if (user == localObj[index][0]) {
            showModal('Error' , 'User exists but password is wrong')
            break;
        }
        else if (index == Object.keys(localObj).length - 1){
            showModal('Error' , 'User does not exist')
        }
    }
}

function signup() {
    event.preventDefault()
    let user = usernameForm.value
    let pass = passwordForm.value
    let new_data = { 0 : user , 1 : pass , 2 : 'None' , 3 : []}
    let old_data = JSON.parse(localStorage.getItem('mainObj'))
    let index = (Object.keys(old_data).length)
    old_data[index] = new_data
    localStorage.setItem('mainObj' , JSON.stringify(old_data))
    showModal('Success' , 'You have successfully signed up' , true)
}

function signout() {
    localStorage.removeItem('LOGGED')
    location.replace('index.html')
}

function addNewList() {
    event.preventDefault()
    span.style.display = 'none'
    let listName = document.querySelector('#listName').value
    let new_data = [listName , [] , []]
    let old_data = JSON.parse(localStorage.getItem('mainObj'))
    old_data[logged][3].push(new_data)
    let index = Object.keys(old_data[logged][3]).length
    localStorage.setItem('mainObj' , JSON.stringify(old_data))        
    localObj = JSON.parse(localStorage.getItem('mainObj'))
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
                info != undefined ? appendingItem(info , false , (timeCalc(info[1] , false))) : false ;
            }
        }
        for (let item of localObj[logged][3][cardLocation][2]) {
            appendingDone(false , item)
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
    let time = timeCalc(timeArr , true)
    if (item == '' || time == null) {
        item == '' ? showModal('Error' , 'Invalid Name') : false ;
        time == null ? showModal('Error' , 'Invalid Date') : false ;
    }
    else {
        let new_data = [item , time]
        let old_data = JSON.parse(localStorage.getItem('mainObj'))
        old_data[logged][3][cardLocation][1].push(new_data)
        let index = Object.keys(old_data[logged][3][cardLocation][1]).length
        localStorage.setItem('mainObj' , JSON.stringify(old_data))        
        localObj = JSON.parse(localStorage.getItem('mainObj'))
        appendingItem(old_data[logged][3][cardLocation][1][index - 1] , true , true)
    }
}

let intervalIds = [];

function appendingItem(ref , animation , type) {
    let contain = document.querySelector('.listContent .contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 0.5s ease-in-out' : false ;
    let title = document.createElement('div')
    let time = document.createElement('div')
    title.setAttribute('class' , 'title')
    time.setAttribute('class' , 'time')
    ref != null ? title.innerText = ref[0] : false;
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(time)
    card.append(deleted)
    if (type == null) {
        time.innerText = 'TimeOut'
        time.style.color = 'red'
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
        card.addEventListener('click' , (x) => {
            if (x.target != deleted) {
                let new_data = [ref[0] , time.innerText]
                let old_data = JSON.parse(localStorage.getItem('mainObj'))
                old_data[logged][3][cardLocation][2].push(new_data)
                localStorage.setItem('mainObj' , JSON.stringify(old_data))
                localObj = JSON.parse(localStorage.getItem('mainObj'))
                for(let [index , item] of itemContainer.entries()) {
                    if (item == card) {
                        appendingDone(true , localObj[logged][3][cardLocation][2][index])
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
            }
        })
    }
    else {
        time.innerText = timeLeft(ref)[0]
        time.style.color = timeLeft(ref)[1]
        const Timer = setInterval(() => {
            time.innerText = timeLeft(ref)[0]
            time.style.color = timeLeft(ref)[1]
            timeLeft(ref)[0] == 'TimeOut' ? clearInterval(Timer) : false ;
        } , 1000)
        intervalIds.push(Timer)
        deleted.addEventListener('click' , () => {
            for(let [index , item] of itemContainer.entries()) {
                if (item == card) {
                    card.style.animation = 'fadeOut 0.3s ease-in-out'
                    setTimeout(() => {
                        card.remove()
                        type != null ? clearInterval(Timer) : false ;
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
        card.addEventListener('click' , (x) => {
            if (x.target != deleted) {
                let new_data = [ref[0] , time.innerText]
                let old_data = JSON.parse(localStorage.getItem('mainObj'))
                old_data[logged][3][cardLocation][2].push(new_data)
                localStorage.setItem('mainObj' , JSON.stringify(old_data))
                localObj = JSON.parse(localStorage.getItem('mainObj'))  
                for(let [index , item] of itemContainer.entries()) {
                    if (item == card) {
                        appendingDone(true , localObj[logged][3][cardLocation][2][index])
                        card.style.animation = 'fadeOut 0.3s ease-in-out'
                        setTimeout(() => {
                            card.remove()
                            type != null ? clearInterval(Timer) : false ;
                            let old_data = JSON.parse(localStorage.getItem('mainObj'))
                            old_data[logged][3][cardLocation][1].splice(index , 1)
                            localStorage.setItem('mainObj' , JSON.stringify(old_data))
                            localObj = JSON.parse(localStorage.getItem('mainObj'))
                            itemContainer = document.querySelectorAll('.listContent .contain .card')
                        } , 200)
                        break;
                    }
                }
            }

        })
    }

    itemContainer = document.querySelectorAll('.listContent .contain .card')
}

function appendingDone(animation , item) {
    let contain = document.querySelector('.doneTasks .contain')
    let card = document.createElement('div')
    card.setAttribute('class' , 'card')
    animation == true ? card.style.animation = 'fadeIn 0.5s ease-in-out' : false ;
    let title = document.createElement('div')
    let time = document.createElement('div')
    title.setAttribute('class' , 'title')
    time.setAttribute('class' , 'time')
    title.innerText = item[0]
    if (item[1] == 'TimeOut') {
        time.innerText = `Your task timed out`
        time.style.color = 'red'
    }
    else {
        time.innerText = `Completed ${item[1]} early`
    }
    let deleted = document.createElement('div')
    deleted.setAttribute('class' , 'delete')
    deleted.innerText = '🗑️'
    contain.append(card)
    card.append(title)
    card.append(time)
    card.append(deleted) 
    deleted.addEventListener('click' , () => {
        for(let [index , item] of doneContainer.entries()) {
            if (item == card) {
                card.style.animation = 'fadeOut 0.3s ease-in-out'
                setTimeout(() => {
                    card.remove()
                    let old_data = JSON.parse(localStorage.getItem('mainObj'))
                    old_data[logged][3][cardLocation][2].splice(index , 1)
                    localStorage.setItem('mainObj' , JSON.stringify(old_data))
                    localObj = JSON.parse(localStorage.getItem('mainObj'))
                    doneContainer = document.querySelectorAll('.doneTasks .contain .card')
                } , 200)
                break;
            }
        }
    })
    doneContainer = document.querySelectorAll('.doneTasks .contain .card')
}

function timeCalc (timeArr , validate) {
    if (timeArr[0] == null || timeArr[0] == ['']) { 
        return null
    }
    else {
        if (validate == true) {
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
            // The Ifs of doom
            if (dateYear > timeYear) {
                return null  
            }
            else if (dateYear == timeYear) {  
                if (dateMonth > timeMonth) {
                    return null  
                }
                else if (dateMonth == timeMonth) {
                    if (dateDay > timeDay) {
                        return null
                    }
                    else if (dateDay == timeDay) {
                        if (dateHours > timeHours) {
                            return null
                        }
                        else if (dateHours == timeHours) {
                            if (dateMinutes > timeMinutes) {
                                return null
                            }
                            else {
                                return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
                            }
                        }
                        else {
                            return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
                        }
                    }
                    else {
                        return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
                    }
                }
                else {
                    return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
                }
            }
            else {
                return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
            }
        }
        else {
            let date = new Date()
            let dateYear = date.getFullYear()
            let dateDay = date.getDate()
            let dateMonth = date.getUTCMonth() + 1
            let dateHours = date.getHours()
            let dateMinutes = date.getMinutes()
            timeArr = timeArr.split(' ')
            let timeYear = parseInt(timeArr[0])
            let timeDay = parseInt(timeArr[1])
            let timeMonth = parseInt(timeArr[2])
            let timeHours = parseInt(timeArr[3])
            let timeMinutes = parseInt(timeArr[4])
            let years = timeYear - dateYear
            let months = timeMonth - dateMonth
            let days = timeDay - dateDay
            let hours = timeHours - dateHours
            let minutes = timeMinutes - dateMinutes
            if (years <= 0 && days <= 0 && months <= 0 && hours <= 0 && minutes <= 0) {
                return null
            }
            else {
                return(`${timeYear} ${timeDay} ${timeMonth} ${timeHours} ${timeMinutes}`)
            }
            
        }
    }
}

function timeLeft (time) {
    // Current time
    let date = new Date()
    let dateYear = date.getFullYear()
    let dateDay = date.getDate()
    let dateMonth = date.getUTCMonth() + 1
    let dateHours = date.getHours()
    let dateMinutes = date.getMinutes()
    // User input time
    let timeArr = time[1].split(' ')
    let timeYear = parseInt(timeArr[0])
    let timeDay = parseInt(timeArr[1])
    let timeMonth = parseInt(timeArr[2])
    let timeHours = parseInt(timeArr[3])
    let timeMinutes = parseInt(timeArr[4])
    let years = timeYear - dateYear
    let months = timeMonth - dateMonth
    let days = timeDay - dateDay
    let hours = timeHours - dateHours
    let minutes = timeMinutes - dateMinutes
    let daysOfTheMonth = [31 , 29 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31]
    if (months < 0) {
        months += months * -2 
    }
    if (days < 0) {
        days = daysOfTheMonth[dateMonth - 1] - (days * -1)  
    }
    if (hours < 0) {
        hours = 24 - (hours * -1)
        days >= 1 ? days-- : false ;
    }
    if (minutes < 0) {
        minutes = 60 - (minutes * -1)
        hours >= 1 ? hours-- : false ;
    }
    let data = `${years}y ${months}mon ${days}day ${hours}h ${minutes}min`
    if (years == 0 && months == 0 && days == 0 && hours == 0 && minutes == 0) {
        return (['TimeOut' , 'red'])  
    }
    else {
        return ([data , 'rgb(47, 255, 0);'])
    }
}

function addNewItemBtn() {
    spanItem.style.display = 'flex'
}

function hideItems() {
    for(let item of itemContainer) {
        item.remove()
    }
    for(let item of doneContainer) {
        item.remove()
    }
    for(let timer of intervalIds) {
        clearInterval(timer)
    }
}

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

function showModal (modalHead , modalText , button) {
    let container = document.createElement('div')
    container.setAttribute('class' , 'popupContainer')
    let modal = document.createElement('div')
    modal.setAttribute('class' , 'popupModal')
    let head = document.createElement('h4')
    let text = document.createElement('p')
    head.innerText = modalHead
    text.innerText = modalText
    document.body.append(container)
    container.append(modal)
    modal.append(head)
    modal.append(text)
    if (button == true) {
        let modalButton = document.createElement('button')
        modalButton.innerText = 'Continue'
        modal.append(modalButton)
        modalButton.addEventListener('click' , () => {
            location.reload()
        })
    }
    else {
        setTimeout(() => {
            window.addEventListener('click' , (x) => {
                if (x.target != modal){
                    container.remove()
                }
            })
        } , 1000)
    }
}

addHideShow()