import IMessage from "@/interfaces/iMessage";
import IAssistant from "@/interfaces/iAssistant";

export interface IRequestData {
  assistant: IAssistant;
  message: IMessage,
}