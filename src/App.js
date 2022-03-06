import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useForm, FormProvider } from "react-hook-form";

import { createUserWithEmailAndPassword, deleteUser, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useEffect, useState } from 'react';

import Register from './Register';
import Order from './Order';
import Done from './Done';

export default function App(){

    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const [available, setAvailable] = useState([true, true, true, true]);
    const [taken, setTaken] = useState([0, 0, 0, 0])

    const methods = useForm()
    const [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        toggle && getDoc(doc(db, "config/capacity")).then((doc) => {
            const availability = [ 
                doc.data()?.singleCapacity ? doc.data()?.singleCapacity > doc.data()?.single : true,
                doc.data()?.doubleCapacity ? doc.data()?.doubleCapacity > doc.data()?.double : true,
                doc.data()?.tripleCapacity ? doc.data()?.tripleCapacity > doc.data()?.triple : true,
                doc.data()?.quadrupleCapacity ? doc.data()?.quadrupleCapacity > doc.data()?.quadruple : true
            ];
            setAvailable(availability);
            setTaken([ doc.data()?.single, doc.data()?.double, doc.data()?.triple, doc.data()?.quadruple ])
        })
    }, [toggle])


  
  

    const onSubmit = (data) => {  
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
                    triple: (data.roomType === 3) ? (taken[2]+1) : taken[2],
                    quadruple: (data.roomType === 4) ? (taken[3]+1) : taken[3]
                },
                { merge: true }
                ).finally(() => {                 
                    signOut(auth).then(() => {
                        setDone(true);
                        setLoading(false);
                    })
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