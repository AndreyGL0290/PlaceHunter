const button = document.getElementsByClassName('plus-button')[0];
// Потом сделать доставание из базы данных
let prefsAmount = 0;

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