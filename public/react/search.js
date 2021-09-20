"use strict";

export function loadUserCard(matches, error) {
    if (!error) {
        class App extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    matches: props.matches
                };
            }

            render() {
                return /*#__PURE__*/React.createElement("div", {
                    className: "usercard-container"
                }, [...Array(this.props.matches.length)].map((n, i) => /*#__PURE__*/React.createElement(Usercard, {
                    name: this.state.matches[i].user_name,
                    age: this.state.matches[i].age,
                    avatar: this.state.matches[i].acc_image,
                    sport: this.state.matches[i].sport,
                    level: this.state.matches[i].game_level,
                    key: i
                })));
            }

        }

        ReactDOM.render( /*#__PURE__*/React.createElement(App, {
            matches: matches
        }), document.getElementById('variants'));
    } else {
        ReactDOM.render( /*#__PURE__*/React.createElement("div", {
            className: "filter-error-container"
        }, /*#__PURE__*/React.createElement("p", {
            className: "filter-error"
        }, error)), document.getElementById('variants'));
    }
}

export function loadPreferCard(sports, levels, sport, level, callback) {
    const app = /*#__PURE__*/React.createElement(Prefcard, {
        sports: sports,
        levels: levels,
        sport: sport,
        level: level
    });
    ReactDOM.render(app, document.getElementsByClassName('cards-container')[0]); // Меняет DOM элементы страницы после их инициализации

    callback();
} // React functions


function Prefcard(props) {
    return /*#__PURE__*/React.createElement("div", {
        className: "card"
    }, /*#__PURE__*/React.createElement("form", {
        name: "direction",
        className: "form"
    }, /*#__PURE__*/React.createElement("label", {
        className: "card-text"
    }, "\u0412\u0438\u0434 \u0441\u043F\u043E\u0440\u0442\u0430", /*#__PURE__*/React.createElement("input", {
        list: "sport",
        className: "card-input",
        name: "sport",
        defaultValue: props.sport
    })), /*#__PURE__*/React.createElement("datalist", {
        id: "sport"
    }, /*#__PURE__*/React.createElement(Create_datalist, {
        length: props.sports.length,
        list: props.sports
    })), /*#__PURE__*/React.createElement("label", {
        className: "card-text"
    }, "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0438\u0433\u0440\u044B", /*#__PURE__*/React.createElement("input", {
        list: "level",
        className: "card-input",
        name: "level",
        defaultValue: props.level
    })), /*#__PURE__*/React.createElement("datalist", {
        id: "level"
    }, /*#__PURE__*/React.createElement(Create_datalist, {
        length: props.levels.length,
        list: props.levels
    }))));
}

function Create_datalist(props) {
    return /*#__PURE__*/React.createElement("div", null, [...Array(props.length)].map((n, i) => /*#__PURE__*/React.createElement("option", {
        key: props.list[i]
    }, props.list[i])));
}

function Usercard(props) {
    return /*#__PURE__*/React.createElement("div", {
        className: "user-card"
    }, /*#__PURE__*/React.createElement("div", {
        className: "card-image"
    }, /*#__PURE__*/React.createElement("img", {
        className: "search-avatar",
        src: props.avatar,
        alt: "\u0410\u0432\u0430\u0442\u0430\u0440"
    })), /*#__PURE__*/React.createElement("div", {
        className: "card-info"
    }, /*#__PURE__*/React.createElement("p", {
        className: "user-name"
    }, "\u0418\u043C\u044F: ", props.name), /*#__PURE__*/React.createElement("p", {
        className: "user-age"
    }, "\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ", props.age), /*#__PURE__*/React.createElement("p", {
        className: "user-sport"
    }, "\u0418\u0433\u0440\u0430: ", props.sport), /*#__PURE__*/React.createElement("p", {
        className: "user-level"
    }, "\u0423\u0440\u043E\u0432\u0435\u043D\u044C: ", props.level)));
}

export function loadLocCard(cities, districts) {
    const app = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LocCard, {
        cities: cities,
        districts: districts
    }));
    ReactDOM.render(app, document.getElementsByClassName('cards-container')[1]);
}

function LocCard(props) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        className: "rough-location"
    }, /*#__PURE__*/React.createElement("input", {
        className: "city-input",
        name: "city",
        list: "cities"
    }), /*#__PURE__*/React.createElement("datalist", {
        id: "cities"
    }, /*#__PURE__*/React.createElement(Create_datalist, {
        length: props.cities.length,
        list: props.cities
    })), /*#__PURE__*/React.createElement("input", {
        className: "city-input",
        name: "district",
        list: "districts"
    }), /*#__PURE__*/React.createElement("datalist", {
        id: "districts"
    }, /*#__PURE__*/React.createElement(Create_datalist, {
        length: props.districts.length,
        list: props.districts
    }))));
}