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