import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import LoginPage from '../../pages/auth/login/index';
import { HelmetProvider } from 'react-helmet-async';
import { authService } from '../../services/auth';
import { paths } from '../../routes/paths';
import { useRouter } from '../../hooks';

// Mock hooks and services
vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn().mockReturnValue({
        isAuthenticated: false,
        signIn: vi.fn(),
    })
}));


vi.mock('../../hooks/useRouter', () => ({
    useRouter: vi.fn()
}));

vi.mock('../../hooks/useService', () => ({
    useService: vi.fn().mockReturnValue({
        loading: false,
        callEndpoint: vi.fn().mockResolvedValue({
            data: {
                accessToken: 'token',
                refreshToken: 'refreshToken',
                role: 'admin',
                id: '1',
                email: 'test@carva.com.ar',
            },
        }),
    }),
}));

vi.mock('../../services/auth', () => ({
    authService: {
        logIn: vi.fn().mockResolvedValue({
            data: {
                accessToken: 'token',
                refreshToken: 'refreshToken',
                role: 'admin',
                id: '1',
                email: 'test@carva.com.ar',
            },
        }),
    },
}));

describe('Login Page', () => {
    let emailField: HTMLElement;
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
                    <LoginPage />
                </HelmetProvider>
            </MemoryRouter>);

        emailField = screen.getByLabelText(/email/i);
        passwordField = screen.getByLabelText(/contraseña/i);
        submitButton = screen.getByRole("button", { name: /continuar/i });

    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the login form', () => {
        expect(screen.getByText('Bienvenido')).toBeInTheDocument();
        expect(screen.getByText('¿Todavía no estas registrado?')).toBeInTheDocument();
        expect(screen.getByText('Registrate')).toBeInTheDocument();
        expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    it('show validation error if email is empty', async () => {
        const user = userEvent.setup();
        fireEvent.change(emailField, { target: { value: '' } });
        fireEvent.change(passwordField, { target: { value: 'password' } });

        await user.tab();
        const errorMessage = await screen.findByText(/el email es requerido/i);

        await waitFor(() => {
            expect(emailField).toHaveAttribute('aria-invalid', 'true');
            expect(errorMessage).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    });

    it('show validation error if email is not valid', async () => {
        const user = userEvent.setup();
        fireEvent.change(emailField, { target: { value: 'test@email.' } });
        fireEvent.change(passwordField, { target: { value: 'password' } });

        await user.tab();
        const errorMessage = await screen.findByText(/ingrese un email válido/i);

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
            expect(errorMessage).toBeInTheDocument();
            expect(emailField).toHaveAttribute('aria-invalid', 'true');
        });
    });

    it('show validation error if password is empty', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordField, { target: { value: '' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña es requerida/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    });

    it('show validation error if password is less than 4 caracteres', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordField, { target: { value: '123' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña debe tener al menos 4 caracteres/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    });

    it('show validation error if password is more than 8 caracteres', async () => {
        const user = userEvent.setup();

        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordField, { target: { value: 'password123' } });

        await user.tab();
        const errorMessage = await screen.findByText(/La contraseña puede tener hasta 8 caracteres/i);

        await waitFor(() => {
            //expect(screen.getByText("contraseña")).toHaveAttribute('aria-invalid', 'true'); 
            expect(errorMessage).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    });


    it('submits the form and calls logIn service', async () => {
        // Fill in the form
        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(passwordField, { target: { value: '123qwe' } });
        fireEvent.click(submitButton);

        // Wait for assertions
        await waitFor(() => {
            expect(authService.logIn).toHaveBeenCalledWith('test@email.com', '123qwe');
        });
    });


    it('submits the form and navigates to home page', async () => {

        // Fill in the form
        fireEvent.change(emailField, { target: { value: 'admin@carva.com.ar' } });
        fireEvent.change(passwordField, { target: { value: '123qwe' } });
        fireEvent.click(submitButton);

        // Wait for assertions
        await waitFor(() => {
            expect(authService.logIn).toHaveBeenCalledWith('admin@carva.com.ar', '123qwe');
            expect(mockPush).toHaveBeenCalledWith(paths.index, {});
        });
    });
});
