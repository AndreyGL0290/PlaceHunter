// Исправление отступа от header
const headerHeight = document.getElementById('header').clientHeight + 'px';
document.getElementById('content-container').style.marginTop = headerHeight;

// Проверяем есть ли у браузера пользователя возможность передовать его местоположение
let geo = false;
if (navigator.geolocation) geo = true;

// Данные аккаунта 
let avatar = '';
let userName = '';
let age = '';
let sport = '';
let level = '';

// Сначала запросим информацию с сервера
const request = new XMLHttpRequest;
request.open('POST', '', true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function () {
    let recievedData = JSON.parse(request.response);

    // Данные аккаунта
    if (recievedData.error === undefined) {
        avatar = recievedData.avatar1;
        userName = recievedData.name1;
        age = recievedData.age1;
        sport = recievedData.sport1;
        level = recievedData.level1;
    }

    // По сути осталось сделать только обновление вариантов после нажатия кнопки "Подтвердить" в карточке предпочтений
    
    const app = (
        <>
            <Usercard avatar={avatar} userName={userName} age={age} sport={sport} level={level} />
        </>
    )

    // Если нет совпадений, то надо нарисовать карточку предпочтений, 
    if (recievedData.sport1 === undefined && recievedData.sport !== undefined) {
        document.getElementsByClassName("filter-error")[0].textContent = recievedData.error;
        console.log(1)
        // Загрузка карточки
        loadPreferCard(recievedData.sport, recievedData.level);
    }
    // Если есть совпадения, то нам надо обновить их
    else if (recievedData.sport1 === undefined && recievedData.sport !== undefined) {

        console.log(2)

        // Загрузка карточки
        loadPreferCard(recievedData.sport, recievedData.level);

        ReactDOM.render(<App sport={recievedData.sport} level={recievedData.level} avatar={recievedData.avatar} name={recievedData.name} age={recievedData.age} />, document.getElementById('variants'));
    }

    // Если в гет запросе не указан спорт
    if (recievedData.sportType === undefined && recievedData.sport !== undefined) {

        // Загрузка карточки
        loadPreferCard(recievedData.sport, recievedData.level);

        ReactDOM.render(app, document.getElementById('variants'));
    }
    // Если в гет запросе указан спорт
    else if (recievedData.sportType !== undefined) {

        // Загрузка карточки
        loadPreferCard(recievedData.sportType, 'Любой');

        const request = new XMLHttpRequest;
        request.open('POST', '', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ sport: recievedData.sportType, level: 'Любой' }));

        ReactDOM.render(app, document.getElementById('variants'));
    }
})

request.send(JSON.stringify({ startSettings: true }));


function loadPreferCard(sport, level) {
    // Имя отлично от стандартного request так как node путается в именах переменных среди двух запросов посланных почти одновременно
    const request1 = new XMLHttpRequest;

    request1.open('POST', '', true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.addEventListener("load", function () {
        let recievedData = JSON.parse(request1.response);

        const app1 = (
            <>
                <Prefcard sports={recievedData.sports} levels={recievedData.levels} />
            </>
        );

        ReactDOM.render(app1, document.getElementsByClassName('cards-container')[0]);

        document.getElementsByClassName("card-input")[0].value = sport;
        document.getElementsByClassName("card-input")[1].value = level;
        document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
    })

    request1.send(JSON.stringify({ pref: true }));
}



// React functions

function Prefcard(params) {
    return (
        <div className="card">
            <form name="direction" className="form">
                <label className="card-text">Вид спорта
                    <input list="sport" className="card-input" name="sport" />
                </label>
                <datalist id="sport">
                    <Create_datalist n={params.sports.length} list={params.sports} />
                </datalist>

                <label className="card-text">Уровень игры
                    <input list="level" className="card-input" name="level" />
                </label>
                <datalist id="level">
                    <Create_datalist n={params.levels.length} list={params.levels} />
                </datalist>
            </form>
        </div>
    )
}

function Create_datalist(params) {
    return (
        <>
            {[...Array(params.n)].map((n, i) => <option key={params.list[i]}>{params.list[i]}</option>)}
        </>
    )
}

function Usercard(props) {
    return (
        <div className="user-card">
            <div className="card-image">
                <img className="search-avatar" src={props.avatar} alt='Аватар' />
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
