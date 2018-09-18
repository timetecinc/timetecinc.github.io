

 var dataPageSelec = "nav-item";
 var listingPageSelec = "nav-item";
 var fbaPageSelec = "nav-item";
 var invIOPageSelec = "nav-item";
 var name, email, photoUrl, uid;




$(document).ready(function() {

firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
    console.log("user logged in ");
    console.log(user);

  name = user.displayName;
  email = user.email;
 
  uid = user.uid; 

  console.log("name: " + name);
  console.log("email: " + email);
  console.log(uid);
 // window.location = 'data.html';

  } else {
    // No user is signed in.
    console.log("not logged in inNav");
    window.location = 'index.html';
  }
});



 var current_page = location.pathname.split('/').pop();
   if(current_page == 'data.html'){
      dataPageSelec = "nav-item active";
   }
   else if(current_page == 'listing.html'){
       listingPageSelec = "nav-item active";
       
   }
   else if(current_page == 'fba.html' || current_page == 'FBAPlan.html' ){
       fbaPageSelec = "nav-item active";
   }else if(current_page == 'myProfile.html'){
       $(".navbar #myProfile").addClass('active');
   }else if(current_page == 'inventoryIO.html'){
       $(".navbar #myProfile").addClass('active');
   }
initialNavBar();
})

function initialNavBar(){
document.getElementById("navBar").innerHTML =
"<nav class='navbar navbar-expand-lg navbar-light bg-light flex-md-nowrap p-0 shadow'>"
 +"<a class='navbar-brand' href='data.html'>"
   +" <img src='image/ICON.png' width='30' height='30' class='d-inline-block align-top' alt=''>"
   + " Timetec Inc</a>"
   +"<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"
   +" <span class='navbar-toggler-icon'></span>"
   +"</button>"
   +" <div class='collapse navbar-collapse' id='navbarNavDropdown'>"
 +"<ul class='navbar-nav mr-auto'>"
   +"<li id='listingPage'class='"+invIOPageSelec+"'>"
    + "<a class='nav-link' href='dashboard.html'>Dashboard</a>"
    +"</li>"
   + "<li id='dataPage' class='"+dataPageSelec+"'>"
     +"<a class='nav-link' href='data.html'>Memory Data</a>"
    +"</li>"
    +"<li id='listingPage'class='"+listingPageSelec+"'>"
     + "<a class='nav-link' href='listing.html'>Listing</a>"
    +"</li>"
    +"<li id='listingPage'class='"+invIOPageSelec+"'>"
     + "<a class='nav-link' href='inventoryIO.html'>Inventory</a>"
    +"</li>"
   +" <li class='nav-item dropdown'>"
     +"<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'  >FBA</a>"
      +"<div class='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>"
       +"<a class='dropdown-item' href='FBAPlan.html'>FBA Shipping Plan</a>"
       +"<a class='dropdown-item' href='fba.html'>FBA Shipping Slip</a>"
      +"</div>"
    +"</li>"
  +" <li class='nav-item dropdown'>"
     +"<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'  >"+name+"</a>"
      +"<div class='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>"
       +"<a class='dropdown-item' href='#'>Logout</a>"
      +"</div>"
    +"</li>"
    +"</ul>"
    +"</div>"
+"</nav>";
}