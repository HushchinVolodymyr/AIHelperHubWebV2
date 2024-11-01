import {toast} from '@/hooks/use-toast'
import axios from "axios";
import IAssistantCreate from "@/interfaces/iAssistantCreate";
import IMessage from "@/interfaces/iMessage";

// Base API URL
const API_URl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createAssistantRequest = async (createAssistant: IAssistantCreate) => {
  // Take token from session storage
  const token = sessionStorage.getItem("token");
  
  // Check if token present
  if (!token) {toast({variant: "destructive", title: "Error", description: "No token found"}); return}
  
  try {
    // Send request to server, with header and credentials
    const response = await axios.post(`${API_URl}/api/assistant/crud`, createAssistant, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    
    // If response 201_CREATED return data
    if (response.status === 201) {
      console.log(response.data)
      // Show toast that assistant created successfully
      toast({
        variant: "default",
        title: "Success",
        description: "Assistant created successfully"
      })
      
      // Return assistant
      return response.data.assistant;
    }
    // Else throw notification
    
    else toast({variant: "destructive", title: "Error", description: response.data.message});

    
  } catch (error) {
    toast({variant: "destructive", title: "Error", description: "Request error"});
  }
}

// Get list of user assistants
export async function userAssistantsList() {
  // Get token from session storage
  const token = sessionStorage.getItem("token");

  // Check if token present
  if (!token) {
    toast({variant: "destructive", title: "Error", description: "No token found"});
    return
  }

  try {
    // Send GET request to server for assistants list 
    const response = await axios.get(`${API_URl}/api/assistant/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    
    // Check response status
    if (response.status === 200) {
      return response.data.assistants;
    }
    
  } catch (error) {
    // Catch and throw error
    toast({variant: "destructive", title: "Error", description: "Request error"});
  }
  
}


// Delete assistant
export async function deleteUserAssistant(id: number | null) {
  // Check if id provided
  if (!id) return false; 
  
  // Get token from session storage
  const token = sessionStorage.getItem("token");

  // Check if token present
  if (!token) {
    toast({variant: "destructive", title: "Error", description: "No token found"});
    return false;
  }
  
  try {
    const response = await axios.delete(`${API_URl}/api/assistant/crud/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials: true
    })
    
    // If response success return ture 
    if (response.status === 204) {
      toast({variant: "default", title: "Success", description: "Assistant deleted"});
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(error);
  }
} 


// Send to server message and return assistant response
export async function userAssistantResponse(message: IMessage, assistant_id?: number | null) {
  try {
    // Send message to server then write response in variable 
    const response = await axios.post(`${API_URl}/api/assistant/user_assistant_response`, {
      message: message,
      assistant_id: assistant_id
    })
    
    // Check response status
    if (response.status === 200) {
      
      // Return data from response
      return response.data.data;
    }
  } 
  catch (error) {
    // Catch and rise error
    toast({variant: "destructive", title: "Error", description: "Request error"});
  }
}