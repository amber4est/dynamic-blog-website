//LOAD BLOG POST DATA FROM LOCAL STORAGE
//post object
const post = {
    id: postID,
    title: title,
    content: content,
    image: image
};

//get post from local storage or an empty array
const posts = JSON.parse(localStorage.getItem("posts")) || [];

//get post list
const postList = document.getElementById("post-list");

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