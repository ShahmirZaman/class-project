const userName = document.getElementById("username");
const password = document.getElementById("password");

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if(loggedInUser) window.location.href = '../Home/index.html'

const loginHandler = () => {

    const users = JSON.parse(localStorage.getItem("users"));
    //checking fields
    if(!userName.value || !password.value) return alert("Please Enter All Fields!");
    //checking length
    if(password.value.length < 8) return alert("Password length should be atleast 8 characters long!");
    if(!users) return alert("No User Found!");
    const foundUser = users.find((user) => {
        if(user.userName === userName.value) return user
    });
    if(!foundUser) return alert("No User Found!");
    if(foundUser.password !== password.value) return alert("Incorrect Credentials!");
    alert("Login Successfully, diverting yu to the home page!");
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
    setTimeout(() => {
        window.location.href = '../Home/index.html'
    },2000);
}