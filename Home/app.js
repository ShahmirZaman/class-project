const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

if(!loggedInUser) window.location.href = '../login/index.html'

// const userName = document.getElementById('userName')

// userName.innerHTML = JSON.parse(localStorage.getItem('loggedInUser')).userName

const postInput = document.querySelector("#postInput");
const postImageUrl = document.querySelector("#imageUrl");
let postDisplayArea = document.querySelector(".card-container");
let imageUrl;

const postLocalStorage = JSON.parse(localStorage.getItem('posts')) || [];
function postDisplayHandler() {
    postDisplayArea.innerHTML = "";
    postLocalStorage.reverse().forEach((element) => {
        let card = `
        <div class="card mb-3" style="max-width: 540px; margin-top: 5px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${element.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${element.userDetails.userName}</h5>
              <p class="card-text">${element.inputText}</p>
              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div> 
        `
        postDisplayArea.innerHTML += card;
    })
    
}
postDisplayHandler();

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
        postImageUrl.value = "";
        postDisplayHandler();
}
function postImageHandler() {
        console.log(postImageUrl.value,"====>>>>Image")
        imageUrl = postImageUrl.value;
}
function logoutHandler() {
    // console.log("Chal rha hai kia???")
    localStorage.removeItem('loggedInUser')

    window.location.href = '../login/index.html'
}

