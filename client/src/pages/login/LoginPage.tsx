import './loginPage.css'
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi'

export const LoginPage = () => {

    return (
        <section>
            <div className='login'>
                <h1 className='login-title'>Movies<span className='login-title-span'>H</span>ub</h1>
                <Link to='/home' className='login-div'>
                    <h2 className='login-h2'>Log In</h2>
                    <BiLogIn className='login-icon' />
                </Link>
            </div>
        </section>
    );
};


