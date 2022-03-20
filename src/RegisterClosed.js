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
        <div class="container">
            <img src={logo} className='img-fluid rgstClsd' alt='' width={166} height={151}/>
            <div class="container-fluid ">
                <div class="row">
                    <div class="col-md-7 d-none d-none-sm d-md-block">
                        <img src={illustration} className='img-fluid' alt='' width={400} height={400} max-height ={"100vh"}/>
                    </div>
                    <div class="col-md-5 ">
                        <div class="card bg-transparent border-0">
                            <div class="card-body ">
                                <h1 class="card-title text-white p-5 "  >Registration<br></br> is closed.</h1>
                                <p class="card-text text-white">But don’t worry, we will give you a second chance. Stay tuned for our second wave.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}