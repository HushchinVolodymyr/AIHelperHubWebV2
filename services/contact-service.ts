import IContactDto from "@/DTOs/iContactDto";
import axios from "axios";
import {toast} from "@/hooks/use-toast";

// Take server URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// Send contact service to server with recaptcha validation
export const contactService = async (contactDto: IContactDto) => {
  try {
    // Assign and make response to server
    const response = await axios.post(`${BASE_URL}/api/contacts/create`, contactDto, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    // Check response status
    if (response.status === 201) {
      toast({variant: 'default', title: "Success", description: "Your request sanded!",});
      return true;
    }
    
    // Return false if failed
    return false;
    
  } catch (e) {
    console.error(e);
  } 
}