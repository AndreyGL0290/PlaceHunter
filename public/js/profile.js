// Changes Profile Widget on Logout button
let profileWidget = document.getElementById('profile-widget')
profileWidget.innerHTML = 'Logout'
profileWidget.className = 'navbar-button cursor-pointer'
profileWidget.addEventListener('click', (e) => {e.currentTarget.parentNode.onclick=(e) => {location.href='/logout'}})