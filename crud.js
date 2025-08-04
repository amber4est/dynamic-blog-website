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
        
        //make title clickable
        const titleLink = document.createElement("a");
        titleLink.href = "#";
        titleLink.textContent = post.title;
        //edit form - clickable title
        titleLink.addEventListener("click", function() {
            showEditForm(post);
        });
    
        //title
        const title = document.createElement("h2");
       // title.textContent = post.title;
        title.appendChild(titleLink);
        postListed.appendChild(title);
        
        //content
        const content = document.createElement("p");
        content.textContent = post.content;
        postListed.appendChild(content);

        //image - can't get to work unforunately :(
        if (post.image){
            const image = document.createElement("img");
            image.src = post.image;
            image.alt = "Post's image";
            postListed.appendChild(image);
        }

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

if (postForm){
    postForm.addEventListener("submit", function(event){
        event.preventDefault();

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

            //new post object
            const imageInput = document.getElementById("img");
            const titleValue = titleInput.value;
            const contentValue = contentInput.value;
            const imageValue = imageInput.value;

            let newPost; //declaring outside if/else statements

            if (imageValue){
                newPost = {
                    id: Date.now().toString(),
                    title: titleValue,
                    content: contentValue,
                    image: imageValue
                };
            }
            else {
                newPost = {
                    id: Date.now().toString(),
                    title: titleValue,
                    content: contentValue,
                };
            }
            //get posts from local storage
            const posts = JSON.parse(localStorage.getItem("posts")) || [];

            //add new post object to the array
            posts.push(newPost);
            //set/add to local storage
            localStorage.setItem("posts", JSON.stringify(posts));
        }
    });

    //cancel post button
    postForm.addEventListener("reset", function(){
        window.location.href = "index.html";
    });
}

//edit post
//validate edit post title and content
const editPostForm = document.getElementById("editPostForm");

const editTitleInput = document.getElementById("editTitle");
const editContentInput = document.getElementById("editContent");
const editImageInput = document.getElementById("editImage");

const editTitleError = document.getElementById("editTitleError");
const editContentError = document.getElementById("editContentError");

const editSuccessMessage = document.getElementById("editSuccessMessage");

if (editPostForm){
    editPostForm.addEventListener("submit", function(event){
        event.preventDefault();

        editTitleError.textContent="";
        editContentError.textContent="";
        editSuccessMessage.textContent="";

        let isValid=true;

        if (editTitleInput.value.trim()==='') {
            editTitleError.textContent="Please enter a title.";
            event.preventDefault();
            isValid=false;
        }
        else if (editTitleInput.value.length < 2) {
            editTitleError.textContent="Title must be at least 2 characters.";
            event.preventDefault();
            isValid=false;
        }

        if (editContentInput.value.trim()==='') {
            editContentError.textContent="Please enter some content.";
            event.preventDefault();
            isValid=false;
        }
        else if (editContentInput.value.length < 2) {
            editContentError.textContent="Content must be at least 2 characters.";
            event.preventDefault();
            isValid=false;
        }
        event.preventDefault();

        if (isValid){
            editSuccessMessage.textContent = "The Post has been edited!";

            const postId = editPostForm.getAttribute("data-post-id");
            const index = posts.findIndex(p => p.id === postId);

            if (index !== -1) {
                posts[index].title = editTitleInput.value;
                posts[index].content = editContentInput.value;
                posts[index].image = editImageInput.value;
                localStorage.setItem("posts", JSON.stringify(posts));
            }
        }
    });

    //cancel post button
    editPostForm.addEventListener("reset", function(){
         editPostForm.style.display = "none";
    });
}

//view posts button on new-post.html
const viewPostsButton = document.getElementById("viewPostsButton");
viewPostsButton.addEventListener("click", function() {
    window.location.href = "index.html";
});

function showEditForm(post) {
    //show the form
    const editPostForm = document.getElementById("editPostForm");
    editPostForm.style.display = "block";

    //fill form with current post values
    document.getElementById("editTitle").value = post.title;
    document.getElementById("editContent").value = post.content;
    document.getElementById("editImage").value = post.image || "";

    //store the post id in a variable
    editPostForm.setAttribute("data-post-id", post.id);
}


//delete posts
const deleteButton = document.getElementById("deleteButton");

if (deleteButton && editPostForm) {
    deleteButton.addEventListener('click', function (event) {
        event.preventDefault();

        const postId = editPostForm.getAttribute("data-post-id");

        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        //post to be deleted
        posts = posts.filter(post => post.id !== postId);
        //update posts
        localStorage.setItem("posts", JSON.stringify(posts));

        editSuccessMessage.textContent = "The post has been deleted!";
    });
}

//localStorage.removeItem("posts"); //use to clear local storage
