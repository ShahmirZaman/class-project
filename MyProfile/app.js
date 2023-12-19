const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
console.log("===>>>>",loggedInUser);

if(!loggedInUser) { window.location.href = '../login/index.html'}

let { userName, userEmail, description, pNumber, hobbies, profileUrl, id } = loggedInUser

console.log(userName,userEmail,id,description);
const userNameHtml = document.querySelector('#userName');
console.log("====>>>username:",userNameHtml);
const descHtml = document.querySelector('#desc');
console.log("====>>>username:",descHtml);
const emailHtml = document.querySelector('#email');
console.log("====>>>username:",emailHtml);
const pNumberHtml = document.querySelector('#pNumber');
console.log("====>>>username:",pNumberHtml);
const hobbiesHtml = document.querySelector('#hobbies');
console.log("====>>>username:",hobbiesHtml);
const profilePictureHtml = document.querySelector('#profilePicture2')
console.log('====>>>Profile',profilePictureHtml);

userNameHtml.textContent = userName ? userName : 'No user name'
emailHtml.textContent = userEmail ? userEmail : "No Email Updated"
descHtml.textContent = description ? description : "No Desciption Updated"
pNumberHtml.textContent = pNumber ? pNumber : "No Phone Number Updated"
hobbiesHtml.textContent = hobbies ? hobbies : "No hobbies Updated"
profilePictureHtml.src =  profileUrl ?  profileUrl : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHw'


let userNameInput = document.querySelector('#userNameInput')
let emailInput = document.querySelector('#emailInput')
let phoneNumberInput = document.querySelector('#phoneNumberInput')
let hobbiesInput = document.querySelector('#hobbiesInput')
let imageInput = document.querySelector('#imageInput')
let descriptionInput = document.querySelector('#descriptionInput')
console.log(userNameInput,emailInput,phoneNumberInput,hobbiesInput,imageInput,descriptionInput)

userNameInput.value = userName ? userName : ""
emailInput.value = userEmail ? userEmail : ""
phoneNumberInput.value = pNumber ? pNumber : ""
hobbiesInput.value = hobbies ? hobbies : ""
descriptionInput.value = description ? description : ""
imageInput.value = profileUrl ? profileUrl : ""

function updateProfileHandler() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("===>>>>",loggedInUser);
    let users = JSON.parse(localStorage.getItem('users'))
    console.log("====>>>LS Users",users)
    let updateUserObj = {
        userName: userNameInput.value,
        userEmail: emailInput.value,
        pNumber: phoneNumberInput.value,
        hobbies: hobbiesInput.value.split(','),
        description: descriptionInput.value,
        profileUrl: imageInput.value,
    }
    console.log("====>>>Updated Object",updateUserObj)
    // let users = JSON.parse(localStorage.getItem('users'))
    // console.log("====>>>LS Users",users)
    let userFound = users.find((user) => {
        return user.id == id
    })
    console.log("userFound with previous values",userFound)
    userFound.userName = userNameInput.value,
    userFound.userEmail = emailInput.value,
    userFound.pNumber = phoneNumberInput.value,
    userFound.hobbies = hobbiesInput.value.split(","),
    userFound.description = descriptionInput.value,
    userFound.profileUrl = imageInput.value,    
    console.log("userFound with current values",userFound)
    console.log("users with userFound",users)
    localStorage.setItem("loggedInUser",JSON.stringify(updateUserObj))
    localStorage.setItem("users",JSON.stringify(users))
}

const logoutHandler = () => {
    localStorage.removeItem('loggedInUser')

    window.location.href = '../login/index.html'
}