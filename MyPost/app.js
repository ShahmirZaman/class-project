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
        postLocalStorage = filterPost;
    }
    console.log(filterPost);
    filterPost.reverse().forEach((element) => {
      let card;
      if (element?.image) {
        card = `
            <div class="card mb-3" style="max-width: 540px; margin-top: 5px;  background-color: #0bb495 !important;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  element.image
                }" class="img-fluid rounded-start" alt="..." style="height: 100% !important;width:100% !important">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${
                    element.userDetails.userName.slice(0, 1).toUpperCase() +
                    element.userDetails.userName.slice(1).toLowerCase()
                  }</h5>
                  <p class="card-text">${element.inputText}</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div> 
            `;
      } else {
        card = `
        <div class="card" style="width: 18rem; margin-bottom: 10px !important;border:none !important">
        <div class="card-body" style="background-color: #0bb495 !important; border-radius: 10px !important">
          <h5 class="card-title">${element.userDetails.userName.slice(0, 1).toUpperCase() +
            element.userDetails.userName.slice(1).toLowerCase()}</h5>
          <p class="card-text">${element.inputText}</p>
        </div>
      </div>
        `;
      }
      postDisplayArea.innerHTML += card;
    })
    
}
postDisplayHandler();

function logoutHandler() {
    localStorage.removeItem('loggedInUser')
    window.location.href = '../login/index.html'
}