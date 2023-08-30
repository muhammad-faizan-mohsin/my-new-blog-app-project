import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, db, doc, setDoc,getDoc } from "./firebase.js";


let flag = true;

const getcurrentdata = async(uid) =>{
    const profileFullName = document.getElementById("profileFullName");
    const profileEmail = document.getElementById("profileEmail");
    const name = document.getElementById("name");

    const loader = document.getElementById("loader")
    const docRef = doc(db, "users", uid);
  
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    if(location.pathname === "/dashboard.html"){
        loader.style.display = "none"

      name.innerHTML =  docSnap.data().name

    }else{
        loader.style.display = "none"

      profileFullName.value =  docSnap.data().name
      profileEmail.value =  docSnap.data().email
    }
    } else {
        loader.style.display = "none"
      console.log("No such document!");
    }
}
onAuthStateChanged(auth, (user) => {
    getcurrentdata(user.uid)
   
    if (user) {
        if (location.pathname !== "/dashboard.html" && location.pathname !== "/profile.html" && flag) {
            location.href = "dashboard.html";
        }

    } else {
        if (location.pathname !== "/signin.html" && location.pathname !== "/signup.html") {
            location.href = "signin.html"

        }
    }
});

const spinner = document.getElementById("spinner-main");
const btnText = document.getElementById("btnText");

const signUpBtn = document.getElementById("signUpBtn");
signUpBtn && signUpBtn.addEventListener("click", () => {

    flag = false
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    spinner.style.display = "block"
    btnText.style.display = "none"
    createUserWithEmailAndPassword(auth, email.value, password.value)

        .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name: name.value,
                email: email.value,
                password: password.value,
                phone: phone.value,
            });
            spinner.style.display = "none"
            btnText.style.display = "block"
            flag = true;


            await Swal.fire(
                'Wellcome to Blog App',
                'You clicked the button!',
                'success'
            )
          
            name.value = "",
            email.value = "",
            phone.value = "",
            password.value = ""
         
              location.href = "dashboard.html"
   
        })


        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            spinner.style.display = "none"
            btnText.style.display = "block"
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,

            })
            console.log(errorMessage)
        });

})


const loginBtn = document.getElementById("loginBtn")

loginBtn && loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    btnText.style.display = "none"
    spinner.style.display = "block"
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log("user====>", user)
            spinner.style.display = "none"
            btnText.style.display = "block"
            Swal.fire(
                'Wellcome to Blog App',
                'You clicked the button!',
                'success'
            )

            location.href = "dashboard.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            spinner.style.display = "none"
            btnText.style.display = "block"
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,

            })

        });

})

const logout = document.getElementById("logout");

logout && logout.addEventListener("click", () => {

    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error)
    });
})



