async function deleteHandler(event){
    event.preventDefault();

    const id= window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    const response =await fetch(`/api/posts/${id}`,{
        method: 'DELETE'
    });
    
    //make a delete request, if it goes through then load dashboard.
    // if the request fails then throw an alert.
    if(response.ok){
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteHandler);