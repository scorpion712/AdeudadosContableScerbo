// authService.test.ts
import axios from 'axios';

import { APIConfig } from '../../config';
import { describe, expect, it, vi } from 'vitest';
import { authService } from '../../services/auth';
import { LoginResponse } from '../../models';

vi.mock('axios');

describe('authService', () => {
  it('calls the API with correct parameters', async () => {
    const mockResponse = {
      data: {
        id: "1",
        email: "test@example.com",
        name: "test",
        lastName: "test",
        accessToken: "accsessToken",
        refreshToken: "refreshToken",
        role: "admin"
      } as LoginResponse
    };
    
    (axios.post as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    const email = 'test@example.com';
    const password = 'password123';
    const { call, controller } = await authService.logIn(email, password);

    const response = await call;

    expect(axios.post).toHaveBeenCalledWith(`${APIConfig.baseURL}/Authentication/AccessToken`, {
      email,
      password,
    }, { signal: controller!.signal });

    expect(response).toEqual(mockResponse);
  });
});
