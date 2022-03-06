import logo from './assets/logo.png'

export default function Done(){
    return (
    <div className="flex row justify-content-center align-items-center" style={{ alignContent:"flex-end", justifyItems:"center" }}>
        <div className='card p-5 m-0' style={{width: "fit-content"}} >
        <img className="img-fluid p-4 mb-2 " src={logo} alt="" width={166} height={151} />
        <h2 className="card-title font-weight-bold ">Registration Successful!</h2>  
        <p>Please Contact Our Treasurer to <span style={{ fontWeight: "500" }}>complete your payment</span> and confirm your Registration. <br/>
        {/*a mail had been sent to your email please click on the link to <span style={{ fontWeight: "500" }}>verify your account</span><br/>*/}
        and <span style={{ fontWeight: "500" }}>don't forget your account Credentials</span> you will need them during the congress </p>
        <h6 className='mt-1'>Contact Treasurer</h6>
        <p><span style={{ fontWeight: "500" }}>Name:</span > Zeinab Tekaya <br/> <span style={{ fontWeight: "500" }}>phone:</span > 26 712 590<br/> <span style={{ fontWeight: "500" }}>email:</span > zeinebtekaya@ieee.org </p>
        
        </div>
    </div>
    )
}