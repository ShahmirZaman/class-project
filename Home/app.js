const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) window.location.href = "../login/index.html";

console.log("====>>>>", loggedInUser);
const profilePicture = document.querySelector("#profilePicture");
console.log(profilePicture);

// function uploadProfilePic() {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || [];
//     if(loggedInUser == []) {
//       profilePicture.src = "Assets\person icon1.png";
//     } else if(loggedInUser.hasOwnProperty("profileUrl")) {
//       profilePicture.src = loggedInUser.profileUrl;
//     }
// }
// uploadProfilePic();

const postInput = document.querySelector("#postInput");
const postImageUrl = document.querySelector("#imageUrl");
let postDisplayArea = document.querySelector(".card-container");
const submitBtn = document.getElementById("submitBtn");
let imageUrl;
let oldPost;
let oldPostIndex;

const postLocalStorage = JSON.parse(localStorage.getItem("posts")) || [];
function postDisplayHandler() {
  postDisplayArea.innerHTML = "";
  const postLocalStorage = JSON.parse(localStorage.getItem("posts")) || [];
  postLocalStorage.reverse().forEach((element) => {
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
                ${
                  loggedInUser.userName === element.userDetails.userName
                    ? `<button id="editPost" onclick = "editPostHandler(${element.id})">Edit</button><button id="deletePost" onclick = "deletePostHandler(${element.id})">Delete</button>`
                    : ""
                }
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
        ${
          loggedInUser.userName === element.userDetails.userName
            ? `<button id="editPost" onclick = "editPostHandler(${element.id})">Edit</button><button id="deletePost" onclick = "deletePostHandler(${element.id})">Delete</button>`
            : ""
        }
      </div>
    </div>
      `;
    }
    postDisplayArea.innerHTML += card;
  });
}
postDisplayHandler();

function postInputHandler() {
  let postObj;
  if (imageUrl) {
    postObj = {
      id: Date.now(),
      inputText: postInput.value,
      image: imageUrl,
      userDetails: JSON.parse(localStorage.getItem("loggedInUser")),
    };
  } else {
    postObj = {
      id: Date.now(),
      inputText: postInput.value,
      userDetails: JSON.parse(localStorage.getItem("loggedInUser")),
    };
  }
  postLocalStorage.push(postObj);
  localStorage.setItem("posts", JSON.stringify(postLocalStorage));
  postInput.value = "";
  postImageUrl.value = "";
  postDisplayHandler();
}
function postImageHandler() {
  console.log(postImageUrl.value, "====>>>>Image");
  imageUrl = postImageUrl.value;
}
function logoutHandler() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login/index.html";
}
function deletePostHandler(deleteId) {
  const forDeletePost = JSON.parse(localStorage.getItem("posts"));
  console.log(forDeletePost);
  const filteredPost = forDeletePost.filter((post) => {
    return post.id != deleteId;
  });
  localStorage.setItem("posts", JSON.stringify(filteredPost));
  postDisplayHandler();
}
function editPostHandler(editId) {
  const postLocalStorage = JSON.parse(localStorage.getItem("posts"));
  const findPost = postLocalStorage.find((post) => post.id == editId);
  const findPostIndex = postLocalStorage.findIndex(
    (post) => post.id === editId
  );

  oldPost = findPost;
  oldPostIndex = findPostIndex;

  postInput.value = findPost.inputText;
  submitBtn.innerHTML = "Update";
  submitBtn.setAttribute("onclick", "updatePostHandler()");
}
function updatePostHandler() {
  let postObj;
  console.log("ppost value", postInput.value);
  if (imageUrl) {
    console.log(imageUrl, "===>>>>imageUrl");
    postObj = {
      inputText: postInput.value,
      image: imageUrl,
      userDetails: JSON.parse(localStorage.getItem("loggedInUser")),
    };
  } else {
    postObj = {
      inputText: postInput.value,
      userDetails: JSON.parse(localStorage.getItem("loggedInUser")),
    };
  }
  const updatePostData = {
    id: oldPost?.id,
    inputText: postObj.inputText || oldPost.inputText,
    image: postObj.image || oldPost.image,
    userDetails: JSON.parse(localStorage.getItem("loggedInUser")),
  };
  const postLocalStorage = JSON.parse(localStorage.getItem("posts"));
  postLocalStorage.splice(oldPostIndex, 1, updatePostData);
  localStorage.setItem("posts", JSON.stringify(postLocalStorage));
  postDisplayHandler();
  submitBtn.innerHTML = "Submit";
  submitBtn.setAttribute("onclick", "postInputHandler()");
  postInput.value = "";
  postImageUrl.value = "";
}
