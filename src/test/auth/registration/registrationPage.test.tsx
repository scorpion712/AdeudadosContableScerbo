import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useRouter } from '../../../hooks';
import { HelmetProvider } from 'react-helmet-async';
import RegistrationPage from '../../../pages/auth/registration';
import { userService } from '../../../services';
import { paths } from '../../../routes/paths';


vi.mock('../../../hooks/useRouter', () => ({
    useRouter: vi.fn()
}));

vi.mock('../../../hooks/useService', () => ({
    useService: vi.fn().mockReturnValue({
        loading: false,
        callEndpoint: vi.fn().mockResolvedValue({
            data: {
                id: '1',
            },
        }),
    }),
}));

vi.mock('../../../services/users', () => ({
    userService: {
        registerUser: vi.fn().mockResolvedValue({
            data: {
                id: '1',
            },
        }),
    },
}));

describe('Registration Page', () => {
    let emailField: HTMLElement;
    let nameField: HTMLElement;
    let lastNameField: HTMLElement;
    let passwordField: HTMLElement;
    let submitButton: HTMLElement;

    const mockPush = vi.fn();
    beforeEach(() => {

        (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
            push: mockPush,
        });
        render(
            <MemoryRouter>
                <HelmetProvider>
                    <RegistrationPage />
                </HelmetProvider>
            </MemoryRouter>);

        emailField = screen.getByLabelText(/correo electrónico/i);
        nameField = screen.getByLabelText(/nombre/i);
        lastNameField = screen.getByLabelText(/apellido/i);
        passwordField = screen.getByLabelText(/contraseña/i);
        submitButton = screen.getByRole("button", { name: /registrarme/i });

    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the registration page', () => {
        expect(screen.getByText('Registro')).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(nameField).toBeInTheDocument();
        expect(lastNameField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    it('show validation error if email is empty', async () => {
        const user = userEvent.setup();
        fireEvent.change(emailField, { target: { value: '' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: 'password' } });

        await user.tab(); 
        fireEvent.click(submitButton); 

        await waitFor(() => {
            expect(emailField).toHaveAttribute('aria-invalid', 'true'); 
        });
    });

    it('show validation error if password is empty', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña es requerida/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('show validation error if password is less than 4 caracteres', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '123' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña debe tener al menos 4 caracteres/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('show validation error if password is more than 8 caracteres', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: 'password123' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña puede tener hasta 8 caracteres/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
        });
    });


    it('show validation error if name is empty', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '' } });

        await user.tab();
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/El nombre es requerido/i);

        await waitFor(() => {
            expect(nameField).toHaveAttribute('aria-invalid', 'true');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('show validation error if lastName is empty', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '' } });

        await user.tab();  
        
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/El apellido es requerido/i);

        await waitFor(() => { 
            expect(lastNameField).toHaveAttribute('aria-invalid', 'true');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('submits the form and calls register service', async () => {
        // Fill in the form
        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '123qwe' } });
        fireEvent.click(submitButton);

        // Wait for assertions
        await waitFor(() => {
            expect(userService.registerUser).toHaveBeenCalledWith({
                email: 'test@email.com',
                name: 'test',
                lastName: 'test',
                password: '123qwe',
            });
        });
    });


    it('submits the form and navigates to register success page', async () => {

        // Fill in the form
        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(nameField, { target: { value: 'test' } });
        fireEvent.change(lastNameField, { target: { value: 'test' } });
        fireEvent.change(passwordField, { target: { value: '123qwe' } });
        fireEvent.click(submitButton);

        // Wait for assertions
        await waitFor(() => {
            expect(userService.registerUser).toHaveBeenCalledWith({
                email: 'test@email.com',
                name: 'test',
                lastName: 'test',
                password: '123qwe',
            });
            expect(mockPush).toHaveBeenCalledWith(paths.auth.register.success, {
                state: {
                    email: 'test@email.com',
                    name: 'test'
                }
            });
        });
    });
});
