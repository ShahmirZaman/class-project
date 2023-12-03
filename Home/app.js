const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

if(!loggedInUser) window.location.href = '../login/index.html'

// const userName = document.getElementById('userName')

// userName.innerHTML = JSON.parse(localStorage.getItem('loggedInUser')).userName

const postInput = document.querySelector("#postInput");
const postImageUrl = document.querySelector("#imageUrl");
let postDisplayArea = document.querySelector(".card-container");


const postLocalStorage = JSON.parse(localStorage.getItem("posts")) || [];
function postDisplayHandler() {
    postDisplayArea.innerHTML = "";
    
}
function postInputHandler() {
        let postObj;
        if(imageUrl) {
            postObj = {
                inputText: postInput.value,
                image:imageUrl,
                userDetails:JSON.parse(localStorage.getItem("loggedInUser")),
            }
        } else {
            postObj = {
                inputText: postInput.value,
                userDetails:JSON.parse(localStorage.getItem("loggedInUser")),
            }
        }
        postLocalStorage.push(postObj);
        localStorage.setItem("posts",JSON.stringify(postLocalStorage));
        postInput.value = "";
        imageUrl = "";
        postDisplayHandler();
}
function postImageHandler() {
        console.log(postImageUrl.value,"====>>>>Image")
        let imageUrl = postImageUrl.value;
}
const logoutHandler = () => {
    localStorage.removeItem('loggedInUser')

    window.location.href = '../login/index.html'
}