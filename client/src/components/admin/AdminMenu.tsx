import { useState } from 'react';
import { FaUsers, FaFilm, FaTags, FaStar, FaComments } from 'react-icons/fa';
import './adminMenu.css';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';
import { UsersForm } from '../forms/UsersForm';
import { MoviesForm } from '../forms/MoviesForm';
import { GenresForm } from '../forms/GenresForm';
import { ScoresForm } from '../forms/ScoresForm';
import { CriticsForm } from '../forms/CriticsForm';

export const AdminMenu = () => {
    const { isAuthenticated, user } = useAuth0();
    const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
    const isAdmin = isAuthenticated && user?.nickname === ADMIN_USER;


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);


    const openModal = (form: any) => {
        setSelectedForm(form);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setSelectedForm(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {isAdmin && (
                <div className="admin-navbar">
                    <ul className='admin-ul'>
                        <li onClick={() => openModal('users')}><FaUsers /></li>
                        <li onClick={() => openModal('movies')}><FaFilm /></li>
                        <li onClick={() => openModal('genres')}><FaTags /></li>
                        <li onClick={() => openModal('scores')}><FaStar /></li>
                        <li onClick={() => openModal('critics')}><FaComments /></li>
                    </ul>
                </div>
            )}


            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Admin Form Modal"
                appElement={document.getElementById('root')!}
            >
                <button onClick={closeModal}>Close</button>

                {selectedForm === 'users' && <UsersForm />}
                {selectedForm === 'movies' && <MoviesForm />}
                {selectedForm === 'genres' && <GenresForm />}
                {selectedForm === 'scores' && <ScoresForm />}
                {selectedForm === 'critics' && <CriticsForm />}


            </Modal>
        </>
    );
};


