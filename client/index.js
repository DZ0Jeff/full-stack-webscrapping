const url_input = document.querySelector("input#url")
const send_url_button = document.querySelector('#send') 
const root_container = document.querySelector('.container')


function newEl(type, attrs={}) {
    const el = document.createElement(type);
    for (let attr in attrs) {
        const value = attrs[attr];
        if (attr == 'innerText') el.innerText = value;
        else el.setAttribute(attr, value);
    }
    return el;
}


function checkInput(tag_input) {
    if (tag_input != null && tag_input != '') {
        console.log(tag_input)
        tag_input = ''
    } else {
        alert('Campos Inválidos ou Vazíos, digíte novamente!')
    }
}


async function loadContent() {
    const response = await fetch('http://localhost:3333/games')

    const games = await response.json()

    games.forEach(game => {
        const card = newEl('div', { class: 'card' })
        const title = newEl('h4', { innerText: game.name})
        const img = newEl('img', { src: game.img })
        card.appendChild(title)
        card.appendChild(img)
        root_container.appendChild(card)
    })
}


function main(){
    send_url_button.addEventListener('click', () => {
        // Send to server
        checkInput(url_input.value)
    })

    loadContent()
}

window.onload = () => main()