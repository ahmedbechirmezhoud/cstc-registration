import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./configInit";



export function SignupEmailPassword(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            console.log(userCredentials)
            sendEmailVerification(userCredentials.user)
        })
        .catch((e) => {
            console.log(e)
        })
}

export function saveUserData(data){
    return updateDoc(
        doc(firestore, '/users/' + auth.currentUser.uid),
        data
    )
        
}