/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Gavin Corso
 * Email: corsog@oregonstate.edu
 * 
 * The goal of this Javascript file is to implement the following features into the website
 * 
 * ADD POST FUNCTION
 * -The ability to add a post using a modal from clicking the orange button. (complete)
 * -Be able to close the modal via the X or cancel (complete)
 * -Accept should clear and input and generate a new post (complete)
 * -User will be alterted if any of the fields are blank, modal should not close (complete)
 * -If values are left unspecified no post should be created (complete)
 * 
 * FILTER POSTS FUNCTIONIALITY
 * -if the user enters into the text filter, only posts that contain the text as a substring should display
 * -Minimum price
 * -Maximum price
 * -City selection
 * -Conditions
 * -Cross compatability for filters
 * -Previous changes to the DOM should be removed each time filters are checked for
 */

//Function for "when + is clicked, set display of modal to fixed"


var button = document.getElementById("sell-something-button");
var isOpen = false;
var postText;
var photoUrl;
var sellPrice;
var city;

//initialize post array
var allPosts = document.getElementsByClassName("post");
var postsMaster = [];
for (var i = 0; i < allPosts.length; i++) {
    postsMaster.push(allPosts[i]);
}


//var postNames = [];
//for (var i)


window.addEventListener('click', function () {

    console.log("== The window was clicked")
    console.log("  -- event.target:", event.target)
    console.log("  -- event.currentTarget:", event.currentTarget)

    if (event.target == document.getElementById("sell-something-button") || (event.target == button.firstChild)) {
            handleButtonClick()
            console.log("Button clicked")
    }
    else if (event.target == document.getElementById("modal-close") || (event.target == document.getElementById("modal-cancel"))) {
        closeModal();
        console.log("Modal closed!")
    }
    else if (event.target == document.getElementById("modal-accept")) {
        acceptPost();
        console.log("Post Accepted!")
    }
    else if (event.target == document.getElementById("filter-update-button")) {
        applyFilters(postsMaster);
        console.log("Applying filters")
    }
    else {
        console.log("Nothing important was clicked!")           //implemented for testing purposes
    }
    
})

//listener for condition in modal
var condition_button = document.getElementById("post-condition-fieldset");

condition_button.addEventListener('click', function (event) {
    var previous_condition = document.querySelector('input[checked]');
    var current_condition = event.target;
    var check = document.createAttribute('checked');


    previous_condition.removeAttribute('checked');
    current_condition.setAttributeNode(check);
})


//listener for city in filters
/*var city_selector = document.getElementById("filter-city");

city_selector.addEventListener('click', function (event) {
    var previous_condition = document.querySelector('[selected]');
    var current_condition = event.target;
    var selected = document.createAttribute('selected');


    previous_condition.removeAttribute('selected');
    current_condition.setAttributeNode(selected);
})
*/


//listener for condition filters
var condition_selector = document.getElementById("filter-condition");

condition_selector.addEventListener('click', function (event) {
    event.target.toggleAttribute('picked');
})


function handleButtonClick() {
    document.getElementById("modal-backdrop").style.display = "block";
    document.getElementById("sell-something-modal").style.display = "block";
    isOpen = true;
}

function closeModal() {
    document.getElementById("post-text-input").value = '';
    document.getElementById("post-photo-input").value = '';
    document.getElementById("post-price-input").value = '';
    document.getElementById("post-city-input").value = '';
    
    
    document.getElementById("modal-backdrop").style.display = "none";
    document.getElementById("sell-something-modal").style.display = "none";
    isOpen = false;
}

function acceptPost() {
    postTitle = document.getElementById("post-text-input").value
    photoUrl = document.getElementById("post-photo-input").value
    sellPrice = document.getElementById("post-price-input").value
    city = document.getElementById("post-city-input").value
    var condition_select = document.querySelector('input[checked]');
    var condition = condition_select.getAttribute('value');

    if (postTitle && photoUrl && sellPrice && city) {    //add in condition
        //create Post Text Box
        var postTitle_box = document.createElement('a');
        var postTitle_input = document.createTextNode(postTitle);

        postTitle_box.classList.add("post-title")
        postTitle_box.href = "#";

        postTitle_box.appendChild(postTitle_input);

        //create Post Price
        var postPrice_box = document.createElement('span');
        var postPrice_input = document.createTextNode('$'+sellPrice);
        postPrice_box.classList.add("post-price");

        postPrice_box.appendChild(postPrice_input);

        //create Post City
        var postCity_box = document.createElement('span');
        var postCity_input = document.createTextNode(city);
        postCity_box.classList.add("post-city");

        postCity_box.appendChild(postCity_input);

        //create post description
        var postInfoContainer = document.createElement('div');
        postInfoContainer.classList.add("post-info-container");

        postInfoContainer.appendChild(postTitle_box);
        postInfoContainer.appendChild(postPrice_box);
        postInfoContainer.appendChild(postCity_box);

        //create image
        var image = document.createElement('img');
        var imgLink = document.createAttribute('src')
        imgLink.value = photoUrl;
        var imgAlt = document.createAttribute('alt')
        imgAlt.value = postTitle;

        image.setAttributeNode(imgLink);
        image.setAttributeNode(imgAlt);

        //create image container
        var image_container = document.createElement('div');
        image_container.classList.add("post-image-container");

        image_container.appendChild(image);

        //content container
        var postHolder = document.createElement('div');
        postHolder.classList.add("post-contents");

        postHolder.appendChild(image_container);
        postHolder.appendChild(postInfoContainer);

        //Create Post
        var post = document.createElement('div');
        post.classList.add("post");
        var dataPrice = document.createAttribute('data-price');
        dataPrice.value = sellPrice;
        var dataCity = document.createAttribute('data-city');
        dataCity.value = city;
        var dataCondition = document.createAttribute('data-condition');
        dataCondition.value = condition;

        post.setAttributeNode(dataPrice);
        post.setAttributeNode(dataCity);
        post.setAttributeNode(dataCondition);

        post.appendChild(postHolder);

        var posts = document.getElementById("posts");
        posts.appendChild(post);
        postMaster.push(post);
        closeModal();
    }
    else {
        alert("Please fill in all values first!")
    }
}


function applyFilters(array) {
    var filterText = document.getElementById("filter-text");
    var priceMin = document.getElementById("filter-min-price");
    var priceMax = document.getElementById("filter-max-price");
    //var filterCity = ;
    var filterCondition = [];
    var pickedCondition = document.querySelector('[picked]')

    /*for (var i = 0; i < pickedCondition.length; i++) {
        filterCondition.push(pickedCondition[i]);
    }
    */

/*
    for (var i = 0; i < array.length; i++) {
        if (priceMin > array[i].getElementById('data-price')) {
            //delete node
            console.log("prices is greater!")
        }
        console.log(array[i]);
    }


*/
}
/*
function removeItemFromDisplay(node) {


}
*/