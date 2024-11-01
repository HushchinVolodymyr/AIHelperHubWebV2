import {toast} from "@/hooks/use-toast";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getUser = async () => {
  const token = sessionStorage.getItem("token");
  
  if (!token) {toast({variant: "destructive", title: "Error", description: "No token found"}); return}
  
  try {
    const response = await axios.get(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    
    if (response.status === 200) return response.data;
    
  } catch (error: any) {
    if (error.response) {
      sessionStorage.removeItem("token");
      toast({variant: "default", title: "Logout", description: "Token life time expired!"});
      return  error.response.status;
    } else {
      toast({ variant: "destructive", title: "Error", description: "Network error" });
      return null;
    }
  }
}

