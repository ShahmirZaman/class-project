const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if(!loggedInUser) window.location.href = '../login/index.html';

const { userName, userEmail, desc, pNumber, hobbies, profileUrl, id} = loggedInUser;

const userNameHtml = document.querySelector('#userName')
const descHtml = document.querySelector('#desc')
const emailHtml = document.querySelector('#email')
const pNumberHtml = document.querySelector('#pNumber')
const hobbiesHtml = document.querySelector('#hobbies')
let profilePictureHtml = document.querySelector('#profilePicture2');
console.log("====>>>",profilePictureHtml);

const userNameInput = document.querySelector('#userNameInput')
const emailInput = document.querySelector('#emailInput')
const phoneNumberInput = document.querySelector('#phoneNumberInput')
const hobbiesInput = document.querySelector('#hobbiesInput')
const imageInput = document.querySelector('#imageInput')
console.log("====>>>>",imageInput)
const descriptionInput = document.querySelector('#descriptionInput')

userNameHtml.innerHTML = `${userName.slice(0,1).toUpperCase()}${userName.slice(1).toLowerCase()}`;

descHtml.innerHTML = desc ? desc : "No Description Updated"
emailHtml.innerHTML = userEmail ? userEmail : "No Email Updated"
pNumberHtml.innerHTML = pNumber ? pNumber : "No Phone Number Updated"
hobbiesHtml.innerHTML = hobbies ? hobbies : "No hobbies Updated"

userNameInput.value = userName ? userName : ""
emailInput.value = userEmail ? userEmail : ''
phoneNumberInput.value = pNumber ? pNumber : ''
hobbiesInput.value = hobbies ? hobbies : ''
imageInput.value = profileUrl ? profileUrl : ''
console.log("====>>>>>",imageInput.value);
descriptionInput.value = desc ? desc : ''

if(profileUrl) {
    console.log("====>>>>>",profileUrl);
    profilePictureHtml.src = imageInput.value;
    console.log("====>>>>>>",profilePictureHtml.src);
}

const updateProfileHandler = () => {
    const userObj = {
       userName: userNameInput.value,
       userEmail: emailInput.value,
       pNumber:phoneNumberInput.value,
       hobbies:hobbiesInput.value.split(','),
       profileUrl:imageInput.value,
       desc:descriptionInput.value,
    }
    const users = JSON.parse(localStorage.getItem('users'))

    let myUser = users.find((user) => {
        return user.id === id
    })
    myUser.userName = userNameInput.value,
    myUser.userEmail = emailInput.value,
    myUser.pNumber = phoneNumberInput.value,
    myUser.hobbies = hobbiesInput.value.split(','),
    myUser.profileUrl = imageInput.value,
    myUser.desc = descriptionInput.value,

    localStorage.setItem('loggedInUser', JSON.stringify(userObj))
    localStorage.setItem('users', JSON.stringify(users))
}

const logoutHandler = () => {
    localStorage.removeItem('loggedInUser')

    window.location.href = '../login/index.html'
}