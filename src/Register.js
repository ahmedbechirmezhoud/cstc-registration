import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import logo from './assets/logo2.png';
import fb from './assets/fb.png';
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [account, setAccount] = useState(false);
  const { register, errors, handleSubmit, reset, trigger, formState : {dirtyFields}} = useForm();
  let navigate = useNavigate();

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

  const onSignup = (data) => {
      console.log(data)

      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentials) => {
          sendEmailVerification(userCredentials.user) 
          setAccount(true)
      })
      .catch((e) => {
          console.log(e)
      })

  }

  const onSubmit = (data) => {  
    let docRef = doc(db, "users/" + auth.currentUser.uid)
    setDoc(
      docRef,
      {
        name: data.name,
        phone: data.phone,
        birthday: data.birthday,
        address: data.address,
        university: data.university
        
      }
    ).then(() => {
      toastifySuccess()
      navigate("/order")
    }).catch((e) => {
      console.log(e)
    })
  }

  const onError = (errors) => {
    console.log(errors)
  }

  onAuthStateChanged(auth, (user) => {
    setAccount(user)
  })


  return (
    <div className="container-fluid bg-image" id="back">
      <ToastContainer />
        <div className="row align-items-center" id="main">
            <div className="col-md-5 m-xl-3" id="logo">
                <img className="img-fluid " src={logo} alt="" />
            </div>
            <div className="col"></div>
            <div className="col-md-5 pe-xl-5">
                <div className="card p-4 mb-2" id="cc">
                    <h3 className="mb-4 ">Welcome!</h3>
                    <h2 className="card-title mb-4 font-weight-bold go">Register to CSTC 2.0</h2>
                    <p className="">This account will be advantageous throughout our congress.</p>
                    {!account ? (<form onSubmit={handleSubmit(onSignup, onError)}>
                        <div className="form-group mt-4 ">
                          <label className="form-label go" htmlFor="Email">Email address</label>
                          <input type="email" 
                          {...register('email', { required: true, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          } })} 
                          className="form-control" id="Email" placeholder="Enter your Email " />
                        </div>
                        <div className="form-group">
                          <label className="form-label mt-4 go" htmlFor="pass">Password</label>
                          <input type="password" name="password" {...register('password', { required: true, minLength:8 })} className="form-control" id="pass" placeholder="Enter your Password" />
                        </div>
                        <div className="form-group">
                          <label className="form-label mt-4 go" htmlFor="pass">Confirm Password</label>
                          <input type="password" className="form-control" {...register('cpasasword', { required: true, validate : value => console.log(value)  })} placeholder="Enter your Password" />
                        </div>
                        <div className="d-grid gap-2 mt-5" id="sub">
                            <button type="submit" className="btn btn-dark go">Register</button>
                            <div className="b"></div>
                            <button type="button" disabled className="btn btn-primary go"><img id="fb" src={fb} alt="" /> Login with Facebook</button>
                          </div>
                      </form>) : 
                       <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="form-group">
                         <label className="form-label mt-4 go" htmlFor="pass">Full Name</label>
                         <input type="text" className="form-control" {...register('name', { required: true })} placeholder="Enter your Name" />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go" htmlFor="pass">Phone Number</label>
                         <input type="text" className="form-control" {...register('phone', { required: true })} placeholder="99 999 999" />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go" htmlFor="pass">Birthday Date</label>
                         <input type="date" className="form-control" {...register('birthday', { required: true })}  />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go" htmlFor="pass">Address</label>
                         <input type="text" className="form-control" {...register('address', { required: true })} placeholder="Enter your Address" />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go" htmlFor="pass">University</label>
                         <input type="text" className="form-control" {...register('university', { required: true })} placeholder="Enter your University" />
                       </div>
                       <div className="d-grid gap-2 mt-5" id="sub">
                           <button type="submit" className="btn btn-dark go">Save</button>
                           <button type="button" className="btn btn-danger go" onClick={() => deleteUser(auth.currentUser)}>Cancel</button>
                        </div>
                     </form>}
                </div>
            </div>
        </div>
        </div>
  );
}

