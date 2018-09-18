 var config = {
 	apiKey: "AIzaSyCaiqUn1UMOwuHVT01Mw8s-OSQl9QNHgpc",
 	authDomain: "timetec-data.firebaseapp.com",
 	databaseURL: "https://timetec-data.firebaseio.com",
 	storageBucket: "timetec-data.appspot.com",
 	messagingSenderId: "671839024565"
 };
 firebase.initializeApp(config);
 const auth = firebase.auth();

 var database = firebase.database();



 function authLogin()
 {
 	var name, userEmail, photoUrl, uid;


 	//const email = document.getElementById('inputEmail').value;
 	//const password = document.getElementById('inputPassword').value;
  const email = 'rayg@ttmemory.com';
  const password = 'team1911';
 	const promise = auth.signInWithEmailAndPassword(email,password);
 	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...

  console.log("Error Code: "+ errorCode );

  console.log("errorMessage" + errorMessage);
	});
 }


 firebase.auth().onAuthStateChanged(function(user) {
 	
  if (user) {
    console.log("user logged in ");
    console.log(user);

  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  uid = user.uid; 

  console.log("name: " + name);
  console.log("email: " + email);
  console.log(photoUrl);
  console.log(uid);
  window.location = 'dashboard.html';

  } else {

    console.log("not logged in");
  }
});
