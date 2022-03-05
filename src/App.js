import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useForm, FormProvider } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc, FieldValue } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useState } from 'react';

import Register from './Register';
import Order from './Order';

export default function App(){

    const methods = useForm()
    const [toggle, setToggle] = useState(false);
  
      const toastifySuccess = () => {
          toast('Form sent!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              className: 'submit-feedback success',
              toastId: 'notifyToast',
          });
      };
  

      
    const onSubmit = (data) => {  
        console.log(data)
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredentials) => {
            sendEmailVerification(userCredentials.user) 
            let docRef = doc(db, "users/" + userCredentials.user.uid)
            setDoc(doc(db, "config/capacity"),
                {
                    single: FieldValue.increment(data.roomType == 1 ? 1 : 0 ),
                    double: FieldValue.increment(data.roomType == 2 ? 1 : 0),
                    trible: FieldValue.increment(data.roomType == 3 ? 1 : 0),
                    quadruple: FieldValue.increment(data.roomType == 4 ? 1 : 0)
                })
            setDoc(
                docRef,
                {
                    name: data.name,
                    phone: data.phone,
                    birthday: data.birthday,
                    address: data.address,
                    university: data.university,
                    roomType: data.roomType,
                    payementMethod: data.payementMethod,
                    checkedIn: false,
                    paidFee: false,    
                    votedFor: null
                }
            ).then(() => {
                toastifySuccess()
                
                
                signOut(auth)
            }).catch((e) => {
                onError(e)
                deleteUser(auth.currentUser)
            })
        })
        .catch((e) => {
            onError(e)
        })
      
    }
  
    const onError = (errors) => {
      console.log(errors)
    }
  

    return (
        <div className="container-fluid bg-image" id="back">
        <ToastContainer />
        <div className="row align-items-center" id="main">
            <FormProvider {...methods}  > 
                {!toggle ? <Register handleError={onError} setToggle={setToggle} /> : <Order handleError={onError} onSubmit={onSubmit} />}
            </FormProvider>
        </div>
        </div>
    )
}