async function commentHandler(event){
    event.preventDefault();
    //get data from specific html elements. and then use that data in fetch request.
    const comment_body=document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id=window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    //if there's text in the comment field, then run the POST fetch request,
    //and if it works then reoload page. if not, then throw an alert.

    if(comment_body){
        const response =await fetch('/api/comments', {
            method: 'POST',
            body:JSON.stringify({
                comment_body,
                post_id
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            document.location.reload();
        } else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);