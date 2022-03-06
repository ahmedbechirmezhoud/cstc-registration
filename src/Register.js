import { useFormContext } from 'react-hook-form';

import logo from './assets/logo2.png';
import fb from './assets/fb.png';
import { useState } from 'react';

export default function   Register({ handleError, setToggle }) {

  const { register, handleSubmit, getValues, setValue, setFocus } = useFormContext(); 
  const [account, setAccount] = useState(false);

  return (<>
            <div className="col-md-5 m-xl-3" id="logo">
                <img className="img-fluid " src={logo} alt="" />
            </div>
            <div className="col"></div>
            <div className="col-md-5 pe-xl-5">
                <div className="card p-4 mb-2" id="cc">
                    <h3 className="mb-4 ">Welcome!</h3>
                    <h2 className="card-title mb-4 font-weight-bold go">Register to CSTC 2.0</h2>
                    <p className="">This account will be advantageous throughout our congress.</p>
                    {!account ? (<form onSubmit={handleSubmit(() => {
                      setAccount(true);
                      setValue("name", "");
                      setValue("phone", "")
                      setFocus("name");
                      }, handleError)}>
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
                          <input type="password" name="password" {...register('password', { required: true, minLength: 8 })} className="form-control" id="pass" placeholder="Enter your Password" />
                        </div>
                        <div className="form-group">
                          <label className="form-label mt-4 go">Confirm Password</label>
                          <input type="password" className="form-control" {...register('cpasasword', { required: true, validate : value => getValues("password") === value  })} placeholder="Enter your Password" />
                        </div>
                        <div className="d-grid gap-2 mt-5" id="sub">
                            <button type="submit" className="btn btn-dark go">Register</button>
                            <div className="b"></div>
                            <button type="button" disabled className="btn btn-primary go"><img id="fb" src={fb} alt="" /> Login with Facebook</button>
                          </div>
                      </form>) : 
                       <form onSubmit={handleSubmit(() => setToggle(true))}>
                       <div className="form-group">
                         <label className="form-label mt-4 go">Full Name</label>
                         <input type="text" className="form-control" {...register('name', { required: true })} placeholder="Enter your Name" />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go">Phone Number</label>
                         <input type="text" className="form-control" {...register('phone', { required: true, valueAsNumber: true, minLength: 8, maxLength: 8 })} placeholder="99 999 999" />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go">Birthday Date</label>
                         <input type="date" className="form-control" {...register('birthday', { required: true, valueAsDate:true })}  />
                       </div>
                       <div className="form-group">
                         <label className="form-label mt-4 go">Address</label>
                         <input type="text" className="form-control" {...register('address', { required: true, minLength: 4 })} placeholder="Enter your Address" />
                       </div> 
                       <div className="form-group">
                         <label className="form-label mt-4 go">University</label>
                         <input type="text" className="form-control" {...register('university', { required: true })} placeholder="Enter your University" />
                       </div>
                       <div className="d-grid gap-2 mt-5" id="sub">
                           <button type="submit" className="btn btn-dark go">Save</button>
                           <button type="button" onClick={() => setAccount(false)} className="btn btn-light go">Back</button>
                        </div>
                     </form>}
                </div>
            </div>
        </>
  );
}

