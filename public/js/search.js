// Исправление отступа от header
const headerHeight = document.getElementById('header').clientHeight + 'px';
document.getElementById('content-container').style.marginTop = headerHeight;

let recievedData;

// Проверяем есть ли у браузера пользователя возможность передовать его местоположение
let geo = false;
if (navigator.geolocation) geo = true;

// Первый запрос нужен чтобы получить списки видов спорта и уровней
const request = new XMLHttpRequest;
request.open('POST', '', true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function () {
    recievedData = JSON.parse(request.response);
    const sports = recievedData.sports;
    const levels = recievedData.levels;

    // Второй запрос нужен чтобы определить как перешел user на эту страницу (по ссылке с указанным видом спорта в GET запросе или нет)
    const request1 = new XMLHttpRequest;
    request1.open('POST', '', true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.addEventListener("load", function () {
        recievedData = JSON.parse(request1.response);
        // Если перешли по ссылке с уже указанным видом спорта в GET запросе
        const sportType = recievedData.sportType;
        if (sportType) {
            loadPreferCard(sports, levels, sportType, 'Любой', () => {
                // Выделять блок красным если нет совпадений, зеленым если есть совпадения
                document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
            });
            // Сделать поиск


        }
        // Если зашли на страницу без указанного вида спорта в GET запросе
        else {
            // Делаем запрос с целью узнать есть ли информация о предпочтениях человека в базе данных
            const request2 = new XMLHttpRequest;
            request2.open('POST', '', true);
            request2.setRequestHeader("Content-Type", "application/json");
            request2.addEventListener("load", function () {
                recievedData = JSON.parse(request2.response);
                const sport = recievedData.sport;
                const level = recievedData.level;
                // Если спорт не указан у user'а в БД
                if (recievedData.error) {
                    loadPreferCard(sports, levels, '', '', () => { });
                    document.getElementsByClassName('filter-error')[0].textContent = 'Введите обязательные фильтры';
                }
                // Если спорт действительно есть у user'а в БД
                else {
                    loadPreferCard(sports, levels, sport, level, () => {
                        document.getElementsByClassName('card')[0].style.backgroundColor = '#90ee90';
                    });

                    // Если есть совпадения
                    if (recievedData.matches.length !== 0) {
                        // Выводим совпадения на экран
                        loadUserCard(recievedData.matches);
                    }
                    // Если НЕТ совпадений
                    else {
                        loadUserCard(recievedData.mathes, 'Совпадений не найдено');
                    }
                }
            })

            request2.send(JSON.stringify({ getPreferences: true }));
        }
    })
    request1.send();

    // При нажатии на кнопку смены фильтров менять их в БД (если фильтры небыли изменены, то можно их и не менять)
    // Также нужно проверять валидность введеных значений
    let submit = document.getElementById('submit');
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        let formName = document.getElementsByClassName('form')[0].getAttribute('name');
        const updateSport = document.forms[formName].elements['sport'].value;
        const updateLevel = document.forms[formName].elements['level'].value;

        const request3 = new XMLHttpRequest;
        request3.open('POST', '', true);
        request3.setRequestHeader("Content-Type", "application/json");
        request3.addEventListener("load", function () {
            let recievedData = JSON.parse(request3.response);
            // Если есть совпадения
            if (recievedData.matches.length !== 0) {
                // Выводим совпадения на экран
                loadUserCard(recievedData.matches);
            }
            // Если НЕТ совпадений
            else {
                loadUserCard(recievedData.matches, 'Совпадений не найдено');
            }
        })
        // Если значения введенные юзером есть в списках допустимых значений, то отправляем их в БД через сервер
        if (sports.includes(updateSport) && levels.includes(updateLevel)) request3.send(JSON.stringify({ getPreferences: true, updatePreferences: true, sport: updateSport, level: updateLevel }));
        // Иначе отправляем дефолтные ''
        else { request3.send(JSON.stringify({ getPreferences: true, updatePreferences: true, sport: '', level: '' })); }
    }, true);

})

request.send(JSON.stringify({ getLists: true }));



// Сделать перезагрузку вариантов по нажатию кнопки
function loadUserCard(matches, error) {
    if (!error) {
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = { matches: props.matches };
            }

            // componentDidMount() {
            //     this.setState({ name: this.props.name, age: this.props.age, avatar: this.props.avatar, sport: this.props.sport, level: this.props.level });
            // }

            render() {
                return (
                    <div className='usercard-container'>
                        {[...Array(this.props.matches.length)].map((n, i) => <Usercard name={this.state.matches[i].user_name} age={this.state.matches[i].age} avatar={this.state.matches[i].acc_image} sport={this.state.matches[i].sport} level={this.state.matches[i].game_level} key={i}/>)}
                    </div>)
            }
        }

        ReactDOM.render(<App matches={matches} />, document.getElementById('variants'));
    } else {
        ReactDOM.render(<div className="filter-error-container"><p className="filter-error">{error}</p></div>, document.getElementById('variants'));
    }
}

function loadPreferCard(sports, levels, sport, level, callback) {
    const app = (
        <Prefcard sports={sports} levels={levels} sport={sport} level={level} />
    );

    ReactDOM.render(app, document.getElementsByClassName('cards-container')[0]);

    // Меняет DOM элементы страницы после их инициализации
    callback();
}



// React functions

function Prefcard(props) {
    return (
        <div className="card">
            <form name="direction" className="form">
                <label className="card-text">Вид спорта
                    <input list="sport" className="card-input" name="sport" defaultValue={props.sport} />
                </label>
                <datalist id="sport">
                    <Create_datalist length={props.sports.length} list={props.sports} />
                </datalist>

                <label className="card-text">Уровень игры
                    <input list="level" className="card-input" name="level" defaultValue={props.level} />
                </label>
                <datalist id="level">
                    <Create_datalist length={props.levels.length} list={props.levels} />
                </datalist>
            </form>
        </div>
    )
}

function Create_datalist(props) {
    return (
        <div>
            {[...Array(props.length)].map((n, i) => <option key={props.list[i]}>{props.list[i]}</option>)}
        </div>
    )
}

function Usercard(props) {
    return (
        <div className="user-card">
            <div className="card-image">
                <img className="search-avatar" src={props.avatar} alt='Аватар' />
            </div>
            <div className="card-info">
                <p className="user-name">Имя: {props.name}</p>
                <p className="user-age">Возраст: {props.age}</p>
                <p className="user-sport">Игра: {props.sport}</p>
                <p className="user-level">Уровень: {props.level}</p>
            </div>
        </div>
    )
}
