const userName = document.getElementById("username");
const email = document.getElementById("user-email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const button = document.getElementById("signup-btn");

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if(loggedInUser) window.location.href = '../Home/index.html'

const signUpHandler = () => {

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users,"=======>> users");

    //checking Fields
    if(!userName.value || !email.value || !password.value || !cpassword.value) {
        return alert("Please enter all fields!");
    }
    //checking password length
    if(password.value.length < 8) {
        return alert("Password should be atleast 8 characters long!");
    }
    //matching password and cpassword
    if(password.value !== cpassword.value) {
        return alert("Your password and confirm password are not same!");
    }
    const userNameFound = users.find((user) => {
        if(user.userName === userName.value) return user
    })
    if(userNameFound) {
        return alert("UserName already exists!");
    }
    const userEmailFound = users.find((user) => {
        if(user.email === email.value) return user
    })
    if(userEmailFound) return alert("UserEmail already exists!")
    const user = {
        id:Date.now(),
        userName:userName.value,
        userEmail:email.value,
        password:password.value,
        cpassword:cpassword.value,
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    window.location.href = '../login/index.html'
    alert("Signup SuccessFully, now you can login, diverting you to the login page");
    // setTimeout(() => {
    //     window.location.href = '../login/index.html'
    // },2000);
}