import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import illustration  from './assets/illustration.svg'
import logo from './assets/logo.png'
import { signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./configInit";
import { useEffect, useState } from 'react';
import { deleteUser } from 'firebase/auth';
export default function Order() {

  const [ roomType, setRoomType ] = useState(null);
  const [ payementMethod, setPayementMethod ] = useState(null);
  const [roomMates, setRoomMates] = useState([]);

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


  const onSubmit = (e) => {  
    e.preventDefault()
    let docRef = doc(db, "users/" + auth.currentUser.uid)
    console.log("edf")
    setDoc(
      docRef,
      {
          roomType,
          payementMethod,
          checkedIn: false,
          paidFee: false,
      },
      { merge: true }
    ).then(() => {
      toastifySuccess()
      signOut(auth)
    }).catch((e) => {
      console.log(e)
    })
  }

  const onError = (errors) => {
    console.log(errors)
  }
  let rows= [];
  useEffect(() => {
    for(var i = 1 ; i < roomType; i++) {
        rows.push("");
    }
    setRoomMates(rows)
  }, [roomType])


  return (
    <div className="container-fluid bg-image" id="back">
      <ToastContainer />
        <div className="row align-items-center" id="main">
            <div className="col-md-5 pe-xl-5 p-5">
                <div className="card p-4 mb-2" id="cc">
                    <img className="img-fluid " src={logo} alt="" width={166} height={151} />
                    <h2 className="card-title font-weight-bold ">Payment Information</h2>        
                    <form className='card p-5' onSubmit={onSubmit}>
                        <h5 >Congress Fees</h5>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1"  style={{ fontSize : "17px" }} htmlFor="four">
                            Room for four Full board : 145 Dinars
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setRoomType(4)} checked={roomType == 4} value="" id="four" />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1 " style={{ fontSize : "17px" }} htmlFor="three">
                            Room for three Full board : 150 Dinars
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setRoomType(3)} checked={roomType == 3}  value="" id="three" />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="two">
                            Room for Two Full board : 160 Dinars
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setRoomType(2)}  checked={roomType == 2}  value="" id="two" />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="single">
                            Room single Full board : 190 Dinars
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setRoomType(1)} checked={roomType == 1}  value="" id="single" />
                        </div>


                            {roomType && (roomMates.map((v, i) => <input type="text" key={i} className="form-control p-2 m-1" onChange={(e) => {
                                var rows = roomMates;
                                rows[i] = e.target.value
                                setRoomMates(rows)
                            }} value={v} placeholder={"Enter your Room Mate #"+(i+1)} />))}


                        <h5 className='mt-3'>Payment Methods</h5>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="cash">
                            Cash
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setPayementMethod("cash")} checked={payementMethod == "cash"}  value="" id="cash" />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="poste">
                            D17
                            </label>
                            <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setPayementMethod("D17")} checked={payementMethod == "D17"} value="" id="poste" />
                        </div>
                        <h5 className='mt-3'>Contact Information</h5>
                        <h6 className='mt-1'>Treasurer</h6>
                        <p><span style={{ fontWeight: "500" }}>Name:</span > Zeinab Tekaya <br/> <span style={{ fontWeight: "500" }}>phone:</span > 26 712 590 </p>
                        <h6 className='mt-1'>Chairman</h6>
                        <p><span style={{ fontWeight: "500" }}>Name:</span > Adam Dey <br/> <span style={{ fontWeight: "500" }}>phone:</span > 58881714 </p>
                        <p></p>
                        <div className="d-grid gap-2 mt-5" id="sub">
                           <button type="submit" className="btn btn-dark go">Order Now</button>
                           <button type="button" className="btn btn-danger go" onClick={() => deleteUser(auth.currentUser)}>Cancel</button>
                        </div>
                    </form>        
                </div>
            </div>
            <div className="col"></div>
            <div className="col-md-5 m-xl-3" id="logo">
                <img className="img-fluid " src={illustration} alt="" />
            </div>
        </div>
        </div>
  );
}

