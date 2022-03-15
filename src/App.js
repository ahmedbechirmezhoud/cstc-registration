import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useForm, FormProvider } from "react-hook-form";

import { createUserWithEmailAndPassword, deleteUser, signOut } from "firebase/auth";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useEffect, useState } from 'react';

import Register from './Register';
import Order from './Order';
import Done from './Done';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const [available, setAvailable] = useState([true, true, true, true]);

    const methods = useForm()
    const [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        toggle && getDoc(doc(db, "config/available")).then((doc) => {
            const availability = [doc.data()?.single, doc.data()?.double, doc.data()?.triple, doc.data()?.quadruple]; 
            setAvailable(availability);
        })
    }, [toggle])


    const onSubmit = (data) => {
        console.log(data)  
        if(data.roomType === null || data.payementMethod === null){
            onError(Error("Complete the order Fields"));
        }else{
            setLoading("Creating your Account");
            //unsubscribe();  
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredentials) => {
                setLoading("sending the verification mail to "+data.email);
                //sendEmailVerification(userCredentials.user);
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
                        cin: data.cin,
                        roomMates: data.roomMates ? data.roomMates : null ,
                        payementMethod: data.payementMethod,
                        message: data.message
                    }
                ).then(() => {
                    setLoading("Ordering your Room");
                    setDoc(db, "userEmailPhoneNumbers/" + userCredentials.user.uid, {
                        email : data.email,
                        phone : data.phone
                    }).then(() => {
                        signOut(auth).then(() => {
                            setDone(true);
                            setLoading(false);
                        })
                    }).catch((e) => {
                        console.log(e);
                        onError(Error("Error While ordering your Room"));
                        deleteUser(auth.currentUser);
                        deleteDoc(doc(db,"users/" + userCredentials.user.uid)); 
                    })
                }).catch((e) => {
                    onError(Error("Error While saving your Data"));
                    deleteUser(auth.currentUser);
                })
            })
            .catch((e) => {
                onError(Error("error While Creating your account"));
            })
        }
      
    }
  
    const onError = (error) => {
      console.log(error)
      if(typeof(error) === Error)
          toast.error(error.message);
      else
          toast.error("an Error has occurred! Try again.");
    }
  

    return (
        <div className="container-fluid bg-image" id="back">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
             />
            {loading && (<div style={{"backgroundColor": "rgba(0, 0, 0, 0.7)",position: "fixed", zIndex : "999999",top: "0",left: "0",width: "100vw",height: "100vh"}}><div className="d-flex justify-content-center align-items-center flex-column" style={{ position:"absolute", top: "50%", left: "50%",marginRight: "-50%",transform: "translate(-50%, -50%)"  }} >
                <div className="spinner-border text-light" style={{ width:"5rem", height:"5rem" }} role="status">
                </div>
                <p className='text-light mt-2'>{loading}...</p>
            </div></div> )}
        <div className="row align-items-center" id="main">
            {done 
                ? (<Done /> ) 
                : (<FormProvider {...methods} > 
                    {!toggle ? <Register handleError={onError} setToggle={setToggle} /> : <Order available={available} setToggle={setToggle} handleError={onError} onSubmit={onSubmit} />}
                  </FormProvider>)}
        </div>
        </div>
    )
}