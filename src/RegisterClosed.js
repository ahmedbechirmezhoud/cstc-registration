import background from './assets/bg2.png';
import logo from './assets/Btn.png';
import illustration from './assets/ilst.png';

let style = {
    backgroundImage : `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height : '100vh'
}

export default function RegisterClosed(){
    return (
    <div style = {style}>
        <div className="container">
            <img src={logo} className='img-fluid rgstClsd' alt='' width={166} height={151}/>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-7 d-none d-none-sm d-md-block">
                        <img src={illustration} className='img-fluid' alt='' width={"75%"} max-height ={"100vh"}/>
                    </div>
                    <div className="col-md-5 ">
                        <div className="card bg-transparent border-0">
                            <div className="card-body ">    
                                <h1 className="card-title text-white pb-3 " style={{ fontSize: "60px" }}  >Registration<br></br> is closed.</h1>
                                <p className="card-text text-white">we are really sad to announce that registration for our event is closed. We really wanted to have welcomed all of you among us but every thing has a capacity and we have reached ours. But don't worry, CSTC will always be here and we'd be more than happy to see you in the next edition.</p>
                                <p className="card-text text-white">if you're already a participant then congratulation. You can download the companion app and connect with us. you'll also be able to vote in the IEEE cs Award. </p>
                                <div className="d-grid gap-2 mt-5" id="sub">
                                    <a href='https://expo.dev/artifacts/4be1a436-78b5-4c85-b987-8b01f1ee3aa9' className="btn btn-light go" style={{ display : "flex", justifyContent : "center", alignItems : "center", flexDirection: "row" }} ><p style={{ textAlign :"center", fontSize:22, transform : "translateY(7px)" }}>Download APK<br />Android</p> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}