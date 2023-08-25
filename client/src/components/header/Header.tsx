import './header.css'
import { BiLogOut } from 'react-icons/bi'
export const Header = () => {
    return (
        <header>
            <h1 className='header-title'>Movies<span className='header-title-span'>H</span>ub</h1>
            <BiLogOut className='header-icon' />
        </header>
    )
}
