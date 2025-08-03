//LOAD BLOG POST DATA FROM LOCAL STORAGE
//post object
const post = {
    //id: postID,
    title: title,
    content: content,
    image: image
};

//get post from local storage or an empty array
const posts = JSON.parse(localStorage.getItem("posts")) || [];

//get post list
const postList = document.getElementById("post-list");

//if statement added so there is no confusion between index.html and new-post.html
if (postList){
    //add for each post in a list with the title, content, and image
    posts.forEach(post => {
        //creating the post in a list
        const postListed = document.createElement("li");
        //title
        const title = document.createElement("h2");
        title.textContent = post.title;
        postListed.appendChild(title);
        //content
        const content = document.createElement("p");
        content.textContent = post.content;
        postListed.appendChild(content);
        //image
        const image = document.createElement("img");
        image.src = post.image;
        image.alt = "Post's image";
        postListed.appendChild(image);

        //add the post to the list
        postList.appendChild(postListed);
    });
}
//validate title and content
const postForm = document.getElementById("postForm");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

const successMessage = document.getElementById("successMessage");

postForm.addEventListener("submit", function(event){

    titleError.textContent="";
    contentError.textContent="";
    successMessage.textContent="";

    let isValid=true;

    if (titleInput.value.trim()==='') {
        titleError.textContent="Please enter a title.";
        event.preventDefault();
        isValid=false;
    }
    else if (titleInput.value.length < 2) {
        titleError.textContent="Title must be at least 2 characters.";
        event.preventDefault();
        isValid=false;
    }

    if (contentInput.value.trim()==='') {
        contentError.textContent="Please enter some content.";
        event.preventDefault();
        isValid=false;
    }
    else if (contentInput.value.length < 2) {
        contentError.textContent="Content must be at least 2 characters.";
        event.preventDefault();
        isValid=false;
    }
    event.preventDefault();

    if (isValid){
        successMessage.textContent="New Post has been Added!";
    }

     
    //new post object
    const imageInput = document.getElementById("image");

    const titleValue = titleInput.value();
    const contentValue = contentInput.value();
    const imageValue = imageInput.value();
    const newPost = {
    //id: postID,
    title: titleValue,
    content: contentValue,
    image: imageValue
    };
    
    //get posts from local storage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    //add new post object to the array
    posts.push(newPost);
    //set/add to local storage
    localStorage.setItem("posts", JSON.stringify(posts));
});

//cancel post button
postForm.addEventListener("reset", function(){
    window.location.href = "index.html";
});

