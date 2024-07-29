import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { postApiRes } from '../../../../utils/api_lib.js';
import LoginAdmin from '../page.jsx';
import { useRouter } from 'next/navigation';

// Mock useRouter dari Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock fungsi API
jest.mock('../../../../utils/api_lib.js', () => ({
    postApiRes: jest.fn(),
}));

describe('LoginAdmin Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Membersihkan mock sebelum setiap tes
        useRouter.mockReturnValue({ push: mockPush }); // Mock fungsi push
        window.alert = jest.fn(); // Mock fungsi alert
    });

    test('renders LoginAdmin component', () => {
        render(<LoginAdmin />);

        expect(screen.getByText(/Welcome Back to/i)).toBeInTheDocument();
        expect(screen.getByText(/ElecBill/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(<LoginAdmin />);

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });

        expect(usernameInput.value).toBe('admin');
        expect(passwordInput.value).toBe('admin');
    });

    test('submits the form and handles successful login', async () => {
        // Setup mock API response
        postApiRes.mockResolvedValue({
            result: {
                data: [{
                    id_user: 1,
                    username: 'admin',
                    password: 'admin',
                    nama_admin: "Ahmad",
                    id_level: 1,
                }],
                error: "",
            },
        });

        render(<LoginAdmin />);

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'admin' } });

        fireEvent.click(screen.getByTestId('login-button'));

        // Tunggu efek dan pastikan hasil
        await waitFor(() => {
            expect(postApiRes).toHaveBeenCalledWith('/login', {
                username: 'admin',
                password: 'admin',
                level: 'admin',
            });
            expect(localStorage.getItem('dataUser')).toBeTruthy();
            expect(mockPush).toHaveBeenCalledWith('/admin/dashboard'); // Memastikan redirection
        });
        expect(window.alert).toHaveBeenCalledWith('Berhasil Login!');
    });

    test('shows error alert on failed login', async () => {
        // Setup mock API response dengan error
        postApiRes.mockResolvedValue({
            result: {
                error: "Username and Password is wrong!",
                data: [],
            },
        });

        window.alert = jest.fn(); // Mock fungsi alert

        render(<LoginAdmin />);

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'kusumah' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'kusumah' } });

        fireEvent.click(screen.getByTestId('login-button'));

        // Tunggu efek dan pastikan hasil
        await waitFor(() => {
            expect(postApiRes).toHaveBeenCalledWith('/login', {
                username: 'kusumah',
                password: 'kusumah',
                level: 'admin',
            });
            expect(window.alert).toHaveBeenCalledWith('Username & Password Salah');
        });
    });
});