let formName = document.getElementsByClassName('add-info')[0].getAttribute('name');
document.getElementsByClassName("add-info-button")[0].addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.forms[formName].elements['name'].value;
    let avatar = document.forms[formName].elements['avatar'].value;
    let age = document.forms[formName].elements['age'].value;
    // Сериализуем данные в JSON
    let data = JSON.stringify({ name: name, avatar: avatar, age: age });
    let request = new XMLHttpRequest;
    request.open('POST', '/account', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        // Получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response);
        
    })
    request.send(data);
}, true);
