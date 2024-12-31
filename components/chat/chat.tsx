"use client"
import React, {useEffect, useRef, useState} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import IMessage from "@/interfaces/iMessage";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, Form, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BotMessageSquare, Send} from "lucide-react";
import IAssistant from "@/interfaces/iAssistant";
import {userAssistantResponse} from "@/services/assistant-service";
import {Skeleton} from "@/components/ui/skeleton";


// Message form schema
const messageFormSchema = z.object({
  message: z.string().min(1, {message: "Message can not be empty"}),
})

const Chat = ({assistant}: { assistant: IAssistant }) => {
  // Chat history
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [chatHistory])

  const updateChatHistory = async (message: IMessage) => {
    await setChatHistory(prevHistory => [...prevHistory, message]);
  }

  // Message form hook and setting default values
  const messageForm = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: ""
    }
  });

  // Submit send message
  const sendMessage = async (values: z.infer<typeof messageFormSchema>) => {
    // Create message with data
    const message: IMessage = {
      id: chatHistory.length + 1,
      messageType: true,
      message: values.message,
      responseConfidence: 0
    }
    
    // Reset message form
    messageForm.reset()
    
    // Update chat history (with user message)
    updateChatHistory(message)
    
    // Bot loading ui
    setIsLoading(true)
    
    // Send request to server
    const assistantMessage: IMessage = await userAssistantResponse(message, assistant.id)

    // Update chat history (with assistant message)
    updateChatHistory(assistantMessage)

    // Bot loading ui
    setIsLoading(false)
  }

  const formatText = (text: string) => {
    return text.replace(/\n/g, '<br/>');
  };

  return (
    <div className={`w-full flex flex-col gap-4 justify-end mt-4`}>
      {chatHistory.length == 0 ?
        <div className={`w-full h-[650px] flex flex-col items-center justify-center`}>
          <h1 className={`text-2xl text-gray-600`}>{assistant.name}</h1>
          <p className={`text-l text-gray-600`}>{assistant.description}</p>
        </div> :
        <ScrollArea className={'flex h-[650px] w-full flex-col justify-end'}>
          <div className={"p-1/2 sm:p-4 flex flex-col w-full justify-end min-h-full sm:w-full mx-auto self-end"}>
            {chatHistory.map((message) => (
              <div key={message.id}
                   className={`h-full my-1 sm:my-2 p-2 flex flex-col m-2 rounded-2xl + ${message.messageType ?
                     "bg-secondary p-2 sm:p-3 sm:px-4 text-end self-end justify-end"
                     :
                     "bg-background sm:p-4"}`}
              >
                <div className={'flex'}>
                  {!message.messageType ? <BotMessageSquare className={'size-8 w-12'}/> : null}
                  <p className={"text-l xm:text-xl w-full"}
                     dangerouslySetInnerHTML={{__html: formatText(message.message)}}/>
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className={"flex items-center h-8 my-1 sm:my-2 p-1 m-2 sm:p-4 rounded-2xl"}>
                <BotMessageSquare className={'size-8 w-14'}/>
                <Skeleton className={"w-36 h-4"}/>
              </div>
            ) : null }
            <div ref={chatEndRef}/>
          </div>
        </ScrollArea>
      }
      <Form {...messageForm}>
        <form onSubmit={messageForm.handleSubmit(sendMessage)} className={`flex gap-2 w-full`}>
          <FormField
            control={messageForm.control}
            name={'message'}
            render={({field}) => (
              <FormItem className={`w-full`}>
                <FormControl>
                  <Input placeholder={"Message..."} {...field} className={`w-full`}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" variant={"secondary"} className={'h-10 w-10 p-3'}><Send className={``}/></Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;