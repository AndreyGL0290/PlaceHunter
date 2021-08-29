// Исправление отступа от header
const headerHeight = document.getElementById('header').clientHeight + 'px';
document.getElementById('content-container').style.marginTop = headerHeight;

// Делаем запросы
let request = new XMLHttpRequest();
let receivedData;
let elem;
let tmpl;
request.open("POST", "/", true);
request.setRequestHeader("Content-Type", "application/json");

request.addEventListener("load", function () {
    receivedData = JSON.parse(request.response);
    if (receivedData == '') {
        document.getElementsByClassName('button')[0].href = 'http://localhost:8080/sport/?type=Баскетбол'
        document.getElementsByClassName('button')[1].href = 'http://localhost:8080/sport/?type=Футбол'

        elem = document.createElement('div');
        elem.id = 'account-conteiner';

        tmpl = document.getElementById('account-template');
        elem.appendChild(tmpl.content.cloneNode(true));
        
        document.getElementById('header').style.justifyContent = "flex-start";
        document.getElementById('header').appendChild(elem);
    } else {
        addButtons();
    }
});

request.send();

document.getElementById('clear').addEventListener('click', () => {
    request.open("POST", "/", true);
    let data = JSON.stringify({ action: 'clear' });
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        receivedData = JSON.parse(request.response);
        if (receivedData == '') {

        }
    });
    request.send(data);
});

function addButtons() {
    if (document.getElementsByClassName('button').length == 2) {
        elem = document.createElement('div');
        elem.id = 'entrance-container';
        
        tmpl = document.getElementById('signup-template');
        elem.appendChild(tmpl.content.cloneNode(true));
        
        document.getElementById('header').appendChild(elem);
    }
    
    document.getElementsByClassName('button')[2].addEventListener('click', allowsports);
    document.getElementsByClassName('button')[3].addEventListener('click', allowsports);
}

function allowsports() {
    request.open("POST", "/", true);
    request.setRequestHeader("Content-Type", "application/json");
    // получаем и парсим ответ сервера
    request.addEventListener("load", function () {
        receivedData = JSON.parse(request.response);
        document.getElementsByClassName('error-label')[0].textContent = receivedData;
        if (receivedData == '') {
            document.getElementsByClassName('button')[0].href = 'http://localhost:8080/sport/?type=Баскетбол'
            document.getElementsByClassName('button')[1].href = 'http://localhost:8080/sport/?type=Футбол'
            document.getElementsByClassName('button')[0].removeEventListener('click');
            document.getElementsByClassName('button')[1].removeEventListener('click');
        }
    });
    request.send();
}