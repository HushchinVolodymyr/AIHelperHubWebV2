import axios, { AxiosResponse } from 'axios';
import IRegisterDto from "../DTOs/IRegisterDto";
import { toast } from "@/hooks/use-toast";
import ILoginDto from "@/DTOs/iLoginDto";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { login as loginAction, logout as logoutAction } from '../store/userSlice';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    const register = async (registerDto: IRegisterDto) => {
        try {
            const response: AxiosResponse = await axios.post(`${API_URL}/api/register`, registerDto, { withCredentials: true });

            if (response.status === 201) {
                toast({
                    variant: 'default',
                    title: "Success",
                    description: "User successfully registered",
                });

                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                
                dispatch(loginAction({
                    id: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                }));

                return response;
            }

            if (response.status === 400) {
                toast({
                    variant: 'destructive',
                    title: "Error",
                    description: response.data.data.message
                });
                return response;
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    variant: 'destructive',
                    description: error.response.data.error || 'Error occurred in registration!',
                });
                console.error(error.response.data);
            } else {
                console.error('Error:', error);
            }
        }
    };

    const login = async (loginDto: ILoginDto) => {
        try {
            const response = await axios.post(`${API_URL}/api/login`, loginDto, { withCredentials: true });

            if (response.status === 200) {
                toast({
                    variant: 'default',
                    title: "Success",
                    description: "User successfully logged in",
                });

                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));

                dispatch(loginAction({
                    id: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                }));
            }

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: 'destructive',
                    description: error.response?.data.error || 'Login error!',
                });
                console.error('Error during login request:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error during login:', error);
            }
        }
    };

    const logout = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await axios.get(`${API_URL}/api/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 205) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                
                dispatch(logoutAction());

                toast({
                    variant: 'default',
                    title: "Success",
                    description: "You logged out!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.data.data.message
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error during logout request:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error during logout:', error);
            }
        }
    };

    return { register, login, logout, user };
};
