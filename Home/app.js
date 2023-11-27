const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

if(!loggedInUser) window.location.href = '../Login/index.html'

const userName = document.getElementById('userName')

userName.innerHTML = JSON.parse(localStorage.getItem('loggedInUser')).userName



const logoutHandler = () => {
    localStorage.removeItem('loggedInUser')

    window.location.href = '../Login/index.html'
}