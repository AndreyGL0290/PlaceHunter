const button = document.getElementsByClassName('plus-button')[0];
// Потом сделать доставание из базы данных
let prefsAmount = 0;

// Имя отлично от стандартного так как node путается в именах переменных среди двух запросов посланных почти одновременно
const request1 = new XMLHttpRequest;

request1.open('POST', '', true);
request1.setRequestHeader("Content-Type", "application/json");
request1.addEventListener("load", function () {
    let recievedData = JSON.parse(request1.response);

    const app = (
        <>
            <Prefcard sports={recievedData.sports} levels={recievedData.levels} />
        </>
    );

    ReactDOM.render(app, document.getElementsByClassName('cards-container')[0]);
})

request1.send(JSON.stringify({ pref: true }));

const submit = document.getElementById("submit");

submit.addEventListener('click', function (e) {
    e.preventDefault();

    const request = new XMLHttpRequest;
    request.open('POST', '', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let recievedData = JSON.parse(request.response);
        const sports = recievedData.sports;
        const levels = recievedData.levels;

        let sportInp = document.forms['direction'].elements['sport'].value;
        let levelInp = document.forms['direction'].elements['level'].value;

        if (sports.includes(sportInp) && levels.includes(levelInp)) {
            document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
            const request = new XMLHttpRequest;
            request.open('POST', '', true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({ sport: sportInp, level: levelInp }));
        } else {
            document.getElementsByClassName('card')[0].style.backgroundColor = '#ffa49a';
        }
    })

    request.send(JSON.stringify({ submitpref: true }));
});






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