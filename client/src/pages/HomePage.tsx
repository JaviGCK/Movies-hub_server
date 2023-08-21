
import { Community } from '../components/movies/community.movies/Community'
import { Header } from '../components/header/Header'
import UserProfile from '../components/UserProfile'

export const HomePage = () => {
    return (
        <>
            <Header />
            <Community />
            <UserProfile />
        </>
    )
}
