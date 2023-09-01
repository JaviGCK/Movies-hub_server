import { useAuth0 } from '@auth0/auth0-react'
import './header.css'
import { BiLogOut } from 'react-icons/bi'

export const Header = () => {
    const { logout, user, isLoading } = useAuth0()
    if (isLoading) return <div>Loanding... </div>
    console.log(user);
    return (
        <header>
            <h1 className='header-title'>Movies<span className='header-title-span'>H</span>ub</h1>
            <button className='header-button' onClick={(): Promise<void> => logout()}>
                <BiLogOut className='header-icon' />
            </button>
        </header>
    )
}
