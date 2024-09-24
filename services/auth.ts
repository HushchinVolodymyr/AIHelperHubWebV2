import axios, {AxiosResponse} from 'axios';
import IRegisterDto from "../DTOs/IRegisterDto";
import {toast} from "@/hooks/use-toast";
import ILoginDto from "@/DTOs/iLoginDto";
import {redirect} from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const register = async (registerDto: IRegisterDto) => {
    try{
        const response: AxiosResponse = await axios.post(`${API_URL}/api/register`,
          registerDto, { withCredentials: true });

        if (response.status === 201) {
            toast({
                variant: 'default',
                title: "Success",
                description: "User successfully registered",
            })
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
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
            return 
        } else {
            console.error('Error:', error);
            return
        }
    }    
};

export const login = async (loginDto: ILoginDto) => {
    const response = await axios.post(`${API_URL}/api/login`, 
      loginDto, { withCredentials: true});

    if (response.status === 200) {
        toast({
            variant: 'default',
            title: "Success",
            description: "User successfully logged in",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response;
};

export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get(`${API_URL}/api/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        
        if (response.status == 205) {
            toast({
                variant: 'default',
                title: "Success",
                description: "You logged out!"
            })
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: response.data.data.message
            })
        }
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during logout request:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error during logout:', error);
        }
    }
};
