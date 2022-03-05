import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useForm, FormProvider } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { createUserWithEmailAndPassword, deleteUser, signOut } from "firebase/auth";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useState } from 'react';

import Register from './Register';
import Order from './Order';

export default function App(){

    const [loading, setLoading] = useState(false)

    const [available, setAvailable] = useState([true, true, true, true]);
    const [taken, setTaken] = useState([0, 0, 0, 0])

    const unsubscribe = onSnapshot(doc(db, "config/capacity"), querySnapshot => {
        const availability = [ 
            querySnapshot.data().singleCapacity ? querySnapshot.data().singleCapacity > querySnapshot.data().single : true,
            querySnapshot.data().doubleCapacity ? querySnapshot.data().doubleCapacity > querySnapshot.data().double : true,
            querySnapshot.data().tripleCapacity ? querySnapshot.data().tripleCapacity > querySnapshot.data().triple : true,
            querySnapshot.data().quadrupleCapacity ? querySnapshot.data().quadrupleCapacity > querySnapshot.data().quadruple : true
        ];
        setAvailable(availability);
        setTaken([ querySnapshot.data().single, querySnapshot.data().double, querySnapshot.data().triple, querySnapshot.data().quadruple ])
        
    } )

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
        setLoading("Creating your Account");
        unsubscribe();  
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredentials) => {
            setLoading("Saving Your Information");
            setDoc(
                doc(db, "users/" + userCredentials.user.uid),
                {
                    name: data.name,
                    phone: data.phone,
                    birthday: data.birthday,
                    address: data.address,
                    university: data.university,
                    roomType: data.roomType,
                    roomMates: data.roomMates ? data.roomMates : null ,
                    payementMethod: data.payementMethod,
                    checkedIn: false,
                    paidFee: false,    
                    votedFor: null
                }
            ).then(() => {
                setLoading("Ordering your Room")
                setDoc( 
                    doc(db, "config/capacity"),
                {
                    single: (data.roomType === 1) ? (taken[0]+1) : taken[0],
                    double: (data.roomType === 2) ? (taken[1]+1) : taken[1],
                    trible: (data.roomType === 3) ? (taken[2]+1) : taken[2],
                    quadruple: (data.roomType === 4) ? (taken[3]+1) : taken[3]
                },
                { merge: true }
                ).finally(() => {
                    
                    toastifySuccess();
                    signOut(auth);
                })
            }).catch((e) => {
                onError(e);
                deleteUser(auth.currentUser);
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
            {loading && (<div style={{"backgroundColor": "rgba(0, 0, 0, 0.7)",position: "absolute", zIndex : "999999",top: "0",left: "0",width: "100%",height: "100%"}}><div className="d-flex justify-content-center align-items-center flex-column" style={{ position:"absolute", top: "50%", left: "50%",marginRight: "-50%",transform: "translate(-50%, -50%)"  }} >
                <div className="spinner-border text-light" style={{ width:"5rem", height:"5rem" }} role="status">
                </div>
                <p className='text-light mt-2'>{loading}...</p>
            </div></div> )}
        <ToastContainer />
        <div className="row align-items-center" id="main">
            <FormProvider {...methods}  > 
                {!toggle ? <Register handleError={onError} setToggle={setToggle} /> : <Order available={available} handleError={onError} onSubmit={onSubmit} />}
            </FormProvider>
        </div>
        </div>
    )
}