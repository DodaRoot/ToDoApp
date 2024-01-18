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
    1 : {
        0 : 'Test' ,
        1 : 'Pass' ,
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

console.log(localObj)

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