const firebaseConfig = {
  apiKey: "AIzaSyC_xRuqpfZiHH5-bxJsFlV5FxOOK3CsYD4",
  authDomain: "check-460bc.firebaseapp.com",
  projectId: "check-460bc",
  storageBucket: "check-460bc.appspot.com",
  messagingSenderId: "603820861231",
  appId: "1:603820861231:web:dfcd88e4957d2864d823da"
};

firebase.initializeApp(firebaseConfig);



var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress =  document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
 function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}


function uploadImage(){

    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);


    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is ", error);
    },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);

            if(url != ""){
                img.setAttribute("src",url);
                img.style.display="block";
            }


        })


    })
    
    
}
