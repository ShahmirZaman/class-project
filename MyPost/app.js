const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
console.log(loggedInUser);
if(!loggedInUser) window.location.href = '../login/index.html'

let postDisplayArea = document.querySelector(".card-container");

const postLocalStorage = JSON.parse(localStorage.getItem('posts')) || [];
console.log(postLocalStorage);

function postDisplayHandler() {
    postDisplayArea.innerHTML = "";
    let filterPost = postLocalStorage.filter((element) => {
        if(element.userDetails.userName == JSON.parse(localStorage.getItem('loggedInUser')).userName) {
            return true;
        }
    })
    if(filterPost == "") {
        filterPost = postLocalStorage
    }
    console.log(filterPost);
    filterPost.reverse().forEach((element) => {
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

function logoutHandler() {
    // console.log("Chal rha hai kia???")
    localStorage.removeItem('loggedInUser')

    window.location.href = '../login/index.html'
}