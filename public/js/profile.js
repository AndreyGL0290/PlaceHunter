// Changes Profile Widget on Logout button
let profileWidget = document.getElementById('profile-widget')
profileWidget.innerHTML = 'Logout'
profileWidget.className = 'navbar-button'
profileWidget.onclick = (e) => location.href='/'