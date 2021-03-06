import { useFormContext } from 'react-hook-form';

import illustration  from './assets/illustration.svg'
import logo from './assets/logo.png'

import { useEffect, useState } from 'react';


export default function Order({ handleError, onSubmit, available, setToggle }) {

  const [ roomType, setRoomType ] = useState(null);
  const [roomMates, setRoomMates] = useState([]);
  const [ payementMethod, setPayementMethod ] = useState(null); 
  const { handleSubmit, setValue, getValues, register } = useFormContext(); 

  useEffect(() => {
    let rows= [];
    for(var i = 1 ; i < roomType; i++) {
        rows.push("");
    }
    setRoomMates(rows)
    setValue("roomMates", getValues("roomMates")?.slice(0,roomType-1))  
    setValue("roomType", roomType);
  }, [roomType, getValues, setValue])


  useEffect(() => {
      setValue("payementMethod", payementMethod)
  }, [payementMethod, setValue])

  return (
    <>
    <div className="col-md-5 pe-xl-5 p-5">
        <div className="card p-4 mb-2" id="cc">
            <img className="img-fluid " src={logo} alt="" width={166} height={151} />
            <h2 className="card-title font-weight-bold ">Payment Information</h2>        
            <form className='card p-5' onSubmit={handleSubmit((data) => { onSubmit(data) }, handleError)}>
                <h5 >Congress Fees</h5>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1"  style={{ fontSize : "17px" }} htmlFor="four">
                    Room for four Full board : 145 Dinars <span style={{ opacity:.7, }} > ( All booked )</span>
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" disabled={!available[3]} value="" id="four" />
                </div>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1 " style={{ fontSize : "17px" }} htmlFor="three">
                    Room for three Full board : 150 Dinars
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" disabled={!available[2]} onChange={(e) => setRoomType(3)} checked={roomType === 3}  value="" id="three" />
                </div>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="two">
                    Room for Two Full board : 160 Dinars
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" disabled={!available[1]} onChange={(e) => setRoomType(2)}  checked={roomType === 2}  value="" id="two" />
                </div>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="single">
                    Room single Full board : 190 Dinars
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" disabled={!available[0]} onChange={(e) => setRoomType(1)} checked={roomType === 1}  value="" id="single" />
                </div>

                    {roomType && (roomMates.map((v, i) => <input type="text" key={i} className="form-control p-2 m-1" onChange={(e) => {
                        var rows = roomMates;
                        rows[i] = e.currentTarget.value
                        setRoomMates(rows)
                        setValue("roomMates."+i, e.currentTarget.value)
                    }} value={getValues("roomMates"+(i+1))} placeholder={"Enter your Room Mate #"+(i+1)} />))}

                <span style={{ opacity:.7, }} >Your room mates must fill the registration form</span>

                <h5 className='mt-3'>Payment Methods</h5>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="cash">
                    Cash
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setPayementMethod("cash")} checked={payementMethod === "cash"}  value="" id="cash" />
                </div>
                <div className="form-check">
                    <label className="form-check-label font-weight-bold mb-1" style={{ fontSize : "17px" }} htmlFor="poste">
                    D17 <span style={{ opacity:.7, }} > ( +2DT transaction fees )</span>
                    </label>
                    <input className="form-check-input mt-2" type="checkbox" onChange={(e) => setPayementMethod("D17")} checked={ payementMethod === "D17"}  value="" id="poste" />
                </div>
                <h5 className='mt-3'  htmlFor="message">inquiries & Remarques</h5>
                <div class="form-group">
                    <textarea class="form-control" id="message" placeholder='if any you have any inquiries you can write them here ' {...register("message")} rows="3"></textarea>
                </div>
                <h5 className='mt-3'>Contact Information</h5>
                <h6 className='mt-1'>Treasurer</h6>
                <p><span style={{ fontWeight: "500" }}>Name:</span > Zeinab Tekaya <br/> <span style={{ fontWeight: "500" }}>phone:</span > 26 712 590 </p>
                <h6 className='mt-1'>Chairman</h6>
                <p><span style={{ fontWeight: "500" }}>Name:</span > Adam Dey <br/> <span style={{ fontWeight: "500" }}>phone:</span > 58881714 </p>
                <p></p>
                <div className="d-grid gap-2 mt-5" id="sub">
                    <button type="submit" className="btn btn-dark go">Order Now</button>
                    <button type="button" onClick={() => setToggle(false)} className="btn btn-light go">Back</button>
                </div>
            </form>        
        </div>
    </div>
    <div className="col"></div>
    <div className="col-md-5 m-xl-3" id="illus">
        <img className="img-fluid " src={illustration} alt="" />
    </div>
    </>
  );
}

