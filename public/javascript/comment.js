async function commentHandler(event){
    event.preventDefault();
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);