// Исправление отступа от header
const headerHeight = document.getElementById('header').clientHeight + 'px';
document.getElementById('content-container').style.marginTop = headerHeight;

// Проверяем есть ли у браузера пользователя возможность передовать его местоположение
let geo = false;
if (navigator.geolocation) geo = true;

// Сначала запросим информацию с сервера
const request = new XMLHttpRequest;
request.open('POST', '', true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function () {
    let recievedData = JSON.parse(request.response);

    // Данные аккаунта
    const avatar = recievedData.avatar1;
    const userName = recievedData.name1;
    const age = recievedData.age1;
    const sport = recievedData.sport1;
    const level = recievedData.level1;

    const app = (
        <Usercard avatar={avatar} userName={userName} age={age} sport={sport} level={level}/>
    )

    if (!recievedData.sport1) {
        document.getElementsByClassName("filter-error")[0].textContent = recievedData.error;
        document.getElementsByClassName("card-input")[0].value = recievedData.sport;
        document.getElementsByClassName("card-input")[1].value = recievedData.level;
        document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
    } else if (recievedData.sportType === undefined) {
        document.getElementsByClassName("card-input")[0].value = recievedData.sport;
        document.getElementsByClassName("card-input")[1].value = recievedData.level;
        document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
        ReactDOM.render(app, document.getElementById('variants'));
    } else {
        document.getElementsByClassName('card-input')[0].value = recievedData.sportType;
        document.getElementsByClassName('card-input')[1].value = 'Любой';

        document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
        const request = new XMLHttpRequest;
        request.open('POST', '', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ sport: sportInp, level: levelInp }));

        ReactDOM.render(app, document.getElementById('variants'));
    }
})

function Usercard(props) {
    return (
        <div className="user-card">
            <div className="card-image">
                <img className="search-avatar" src={props.avatar} alt='Аватар'/>
            </div>
            <div className="card-info">
                <p className="user-name">Имя: {props.userName}</p>
                <p className="user-age">Возраст: {props.age}</p>
                <p className="user-sport">Игра: {props.sport}</p>
                <p className="user-level">Уровень: {props.level}</p>
            </div>
        </div>
    )
}

request.send(JSON.stringify({ startSettings: true }));
