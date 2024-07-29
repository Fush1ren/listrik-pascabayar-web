import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataPelanggan from '../page';
import { deleteApiRes, getApiRes, patchApiRes } from '../../../../utils/api_lib';
import { useRouter, usePathname, redirect } from 'next/navigation';

// Mock useRouter dari Next.js
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    redirect: jest.fn(),
}));

// Mock fungsi API
jest.mock('../../../../utils/api_lib', () => ({
    deleteApiRes: jest.fn(),
    getApiRes: jest.fn(),
    patchApiRes: jest.fn(),
}));

describe('DataPelanggan Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Membersihkan mock sebelum setiap tes
        useRouter.mockReturnValue({ push: mockPush }); // Mock fungsi push
        usePathname.mockReturnValue('/admin/data-pelanggan'); // Mock fungsi usePathname
        redirect.mockImplementation(jest.fn()); // Mock fungsi redirect
        window.alert = jest.fn(); // Mock fungsi alert
        window.confirm = jest.fn(); // Mock fungsi confirm
        localStorage.setItem('dataUser', JSON.stringify({ islogin: true, level: 'admin' }));
    });

    afterEach(() => {
        localStorage.clear(); // Bersihkan localStorage setelah setiap tes
    });

    test('renders DataPelanggan component', async () => {
        getApiRes.mockResolvedValue({
            result: {
                data: [],
                error: "",
            },
        });

        render(<DataPelanggan />);

        await waitFor(() => {
            expect(screen.getByText(/Kelola Data Pelanggan/i)).toBeInTheDocument();
            expect(screen.getByText(/Tambah Data/i)).toBeInTheDocument();
        });
    });

    test('handles tambah button click', async () => {
        getApiRes.mockResolvedValue({
            result: {
                data: [],
                error: "",
            },
        });

        render(<DataPelanggan />);

        const tambahButton = screen.getByText(/Tambah Data/i);
        fireEvent.click(tambahButton);

        expect(mockPush).toHaveBeenCalledWith('/admin/data-pelanggan/add');
    });

    test('handles edit button click', async () => {
        const mockData = [
            {
                "id_pelanggan": 1,
                "username": "pelanggan1",
                "password": "password123",
                "nomor_kwh": 1234567890,
                "nama_pelanggan": "Pelanggan Satu",
                "alamat": "Jl. Mawar No. 1",
                "id_tarif": 1
            },
        ];

        getApiRes.mockResolvedValue({
            result: {
                data: mockData,
                error: "",
            },
        });

        render(<DataPelanggan />);

        // const editButton = screen.getByText(/Edit/i);
        // fireEvent.click(editButton);
        const editButton = await waitFor(() => screen.getByText(/Edit/i));
        fireEvent.click(editButton);

        await waitFor(() => {
            expect(screen.getByText(/Edit Data/i)).toBeInTheDocument();
        });
    });

    test('handles delete button click', async () => {
        const mockData = [
            {
                "id_pelanggan": 1,
                "username": "pelanggan1",
                "password": "password123",
                "nomor_kwh": 1234567890,
                "nama_pelanggan": "Pelanggan Satu",
                "alamat": "Jl. Mawar No. 1",
                "id_tarif": 1
            },
        ];

        getApiRes.mockResolvedValue({
            result: {
                data: mockData,
                error: "",
            },
        });

        deleteApiRes.mockResolvedValue(
            {
                result: {
                    data: 'Data was Successfully Deleted!',
                    error: ''
                }
            },
        );

        render(<DataPelanggan />);

        window.confirm.mockReturnValue(true);

        // const deleteButton = screen.getByText(/Delete/i);
        // fireEvent.click(deleteButton);
        const deleteButton = await waitFor(() => screen.getByText(/Delete/i));
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteApiRes).toHaveBeenCalledWith(`/pelanggan?id_pelanggan=1`);
            expect(window.alert).toHaveBeenCalledWith('Data Berhasil Dihapus!');
        });
    });

});
