import './modals.css';
import { useState } from 'react';
import { FaFilm, FaUser, FaTags } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { CreateMovieForm } from '../forms/CreateMovieForm';
import { InfoGenres } from '../info/InfoGenres';
import { UserInfo } from '../info/UserInfo';

export const Modals = ({ userData }: { userData: UserData | null }) => {
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
            <div>
                <ul className="modal-list">
                    <li onClick={() => openModal('user')}><FaUser /></li>
                    <li onClick={() => openModal('movie')}><FaFilm /></li>
                    <li onClick={() => openModal('genre')}><FaTags /></li>
                </ul>
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Home Modal"
                appElement={document.getElementById('root')!}
            >
                <button onClick={closeModal}>X</button>

                {selectedForm === 'user' && <UserInfo userData={userData} />}

                {selectedForm === 'movie' && <CreateMovieForm />}
                {selectedForm === 'genre' && <InfoGenres />}
            </ReactModal>
        </>
    );
};
