let usernameForm = document.querySelector('#username')
let passwordForm = document.querySelector('#password')

let mainObj = {
    0 : {
        0 : 'John' ,
        1 : '12345' ,
        2 : 'None' ,
        3 : {
            0 : 'List Name',
            1 : ['Task One' , 'Time To Finnish'],
            2 : ['Task Two' , 'Time To Finnish'],
        },
    } ,
}

if (localStorage.getItem('mainObj') == null) {
    localStorage.setItem('mainObj' , JSON.stringify(mainObj))
    localObj = JSON.parse(localStorage.getItem('mainObj'))
}
else {
    localObj = JSON.parse(localStorage.getItem('mainObj'))
}

function signin () {
    event.preventDefault()
    let user = usernameForm.value
    let pass = passwordForm.value
    for (let index in localObj) {
        if (user == localObj[index][0] && pass == localObj[index][1]) {
            console.log('Login Successful')
            break;
        }
        else if (user == localObj[index][0]) {
            console.log('User exists but password is wrong')
            break;
        }
        else if (index == Object.keys(localObj).length - 1){
            console.log('User does not exist')
        }
    }
}

console.log(localObj)

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




// List
let element = document.querySelectorAll('.card');
let del = document.querySelectorAll('.delete')
let i = 0
// Selecting the specific lists
element.forEach((x) => {
    del[i].addEventListener('click' , () => {
        x.style.display = 'none'
    })
    i++
})