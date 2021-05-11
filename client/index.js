const send_url_button = document.querySelector('#send') 
const root_container = document.querySelector('.container')

const dev = false
let base_path = "http://localhost:3333"
if(!dev) {
    base_path = "https://game-scrapper.herokuapp.com/"
} 

console.log(base_path)


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
        const output = tag_input
        tag_input = ''
        return output

    } else {
        alert('Campos Inválidos ou Vazíos, digíte novamente!')
        return
    }
}


async function loadContent() {
    const response = await fetch(`${base_path}games`)

    const games = await response.json()

    console.log(games)

    games.forEach(game => {
        const card = newEl('a', { href: game.torrentLink, class: 'card' })
        const title = newEl('h4', { innerText: game.title})
        const img = newEl('img', { src: game.src })

        card.appendChild(title)
        card.appendChild(img)

        root_container.appendChild(card)
    })
}


function main(){
    send_url_button.addEventListener('click', () => {
        const url_input = document.querySelector("input#url").value
        // Send to server
        if (checkInput(url_input)){
            const url_output = checkInput(url_input)
            fetch(`${base_path}games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({url_output})
            })
        }
    })

    loadContent()
}

window.onload = () => main()