import './header.css'
import { BiLogIn } from 'react-icons/bi'

export const Header = () => {
    return (
        <header className='header'>
            <h1 className="title-header">Movies<span> </span><span className="title-span">H</span>ub</h1>
            <span className='title-separate'></span>
            <BiLogIn className='login-icon' />
        </header>
    )
}
