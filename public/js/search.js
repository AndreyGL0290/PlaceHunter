// Исправление отступа от header
const headerHeight = document.getElementById('header').clientHeight + 'px';
document.getElementById('content-container').style.marginTop = headerHeight;

// Проверяем есть ли у браузера пользователя передовать его местоположение
let geo = false;
if (navigator.geolocation) geo = true;
let receivedData;

// Сначала запросим информацию с сервера
const request = new XMLHttpRequest();
request.open('POST', '/', true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function () {
    receivedData = JSON.parse(request.response);
    console.log(receivedData);

    const app = (
        <Usercard />
    )

    ReactDOM.render(app, document.getElementById('variants'));
})

function Usercard(props) {
    return (
        <div className='user-card'>
            <div className='card-image'></div>
            <div className='card-info'></div>
        </div>
    )
}

request.send();
