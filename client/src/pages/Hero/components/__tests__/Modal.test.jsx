import { cleanup, fireEvent, getByRole, render, screen } from '@testing-library/react';
import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import Modal from '../Modal';

const MockModal = () => {
    const handleModal = () => setShowModal(false);
    const [showModal, setShowModal] = useState(true);
    const [isLoginTab, setIsLoginTab] = useState(true);

    return (
        <BrowserRouter>
            <Modal onClose={handleModal} isLoginTab={isLoginTab} toggleTab={setIsLoginTab} />
        </BrowserRouter>
    )
}

test('render modal onto screen', () => {
    render(<MockModal />);
    expect(screen.getByText(/register/i)).toBeTruthy();
})