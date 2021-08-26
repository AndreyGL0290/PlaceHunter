let formName = document.getElementsByClassName('form')[0].getAttribute('name');
let password2;
let data;

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault()
    // получаем данные формы
    let registerForm = document.forms[formName];
    let email = registerForm.elements["email"].value;
    let password1 = registerForm.elements["password1"].value;
    try {
        password2 = registerForm.elements["password2"].value;
    } catch {
        password2 = undefined;
    }
    // сериализуем данные в json
    if (password2 !== undefined) {
        data = JSON.stringify({ email: email, password1: password1, password2: password2 });
    } else {
        data = JSON.stringify({ email: email, password1: password1 });
    }
    let request = new XMLHttpRequest();
    // посылаем запрос на адрес "/login"
    if (formName == 'loginForm') {
        request.open("POST", "/login", true);
    } else {
        request.open("POST", "/registration", true);
    }
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response);
        if (receivedData == '' && formName == 'loginForm') {
            window.location = '/';
        } else if (receivedData == '' && formName == 'registerForm') {
            document.getElementById('submit').removeAttribute('href');
            document.getElementsByClassName('error-label')[0].style.color = 'black';
            document.getElementsByClassName('error-label')[0].textContent = 'Пожалуйста, проверьте вашу почту';
        } else {
            document.getElementsByClassName('error-label')[0].textContent = receivedData;
        }
    })
    request.send(data);
});
