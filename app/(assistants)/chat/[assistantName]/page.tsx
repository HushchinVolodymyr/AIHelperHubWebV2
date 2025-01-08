"use client"
import React, {useEffect, useRef, useState} from 'react';
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

import {ScrollArea} from "@/components/ui/scroll-area"
import {BotMessageSquare, ChevronUp, Send} from "lucide-react";
import {useForm} from "react-hook-form";
import {FormControl, FormField, FormItem, Form, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import IMessage from "@/interfaces/iMessage";
import IAssistant from "@/interfaces/iAssistant";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {toast} from "@/hooks/use-toast";
import {IRequestData} from "@/DTOs/iRequestData";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";


const assistants: IAssistant[] = [
  {
    id: 1,
    name: "DBN assistant",
    description: "Standards for the engineering protection of territories, buildings, and structures in Ukraine. Covers requirements for construction, surveys, and safety measures against landslides and collapses."
  },
  {
    id: 2,
    name: "General knowledge DEMO assistant",
    description: "Steps to create a Facebook Page: choose a category, provide business details, upload images, and set a username for your page. Ensure high-quality content for effective audience engagement."
  },
  {
    id: 3,
    name: "HelpDesk_assistant",
    description: "Overview of positions in technology: delivery management, software development, SEO, business analysis, mobile development, and design. Various opportunities across different domains."
  },
  // {
  //   id: 4,
  //   name: "Papara Demo",
  //   description: "Papara is a digital wallet and payment platform that allows users to make transactions, pay bills, and transfer money. It offers secure and convenient services for online and offline payments."
  // }
]

const messageFormSchema = z.object({
  message: z.string(),
})

export default function Page({params}: { params: { assistantName: string } }) {
  const messageForm = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: ""
    }
  });

  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [assistantChecked, setAssistantChecked] = useState<string>("");
  const [selectedAssistant, setSelectedAssistant] = useState<IAssistant>(assistants[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Set assistant on page load 
  useEffect(() => {
    if (params.assistantName) {
      switch (params.assistantName) {
        case "DBN_assistant":
          setAssistantChecked(`${assistants[0].name}`);
          setSelectedAssistant(assistants[0]);
          break
        case "General_knowledge_DEMO_assistant":
          setAssistantChecked(`${assistants[1].name}`);
          setSelectedAssistant(assistants[1]);
          break
        case "HelpDesk_assistant":
          setAssistantChecked(`${assistants[2].name}`);
          setSelectedAssistant(assistants[2]);
          break
        case "Papara_Demo":
          setAssistantChecked(`${assistants[3].name}`);
          setSelectedAssistant(assistants[3]);
          break
        default:
          setAssistantChecked(`${assistants[0].name}`);
      }
    } else {
      setAssistantChecked(`${assistants[0].name}`);
    }
  }, [params.assistantName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [chatHistory])

  useEffect(() => {
    setChatHistory([]);
  }, [assistantChecked]);

  const onSubmit = async (values: z.infer<typeof messageFormSchema>) => {
    if (values.message.trim() === "") {
      toast({variant: "destructive", description: "Empty message!",})

      return;
    }

    const updateChatHistory = (message: IMessage) => {
      setChatHistory(prevHistory => [...prevHistory, message]);
    }

    setIsLoading(true)

    const newMessage: IMessage = {
      id: chatHistory.length + 1,
      messageType: true,
      message: values.message,
      responseConfidence: 0
    }

    updateChatHistory(newMessage)
    messageForm.reset()

    const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL

    const requestData: IRequestData = {
      assistant: selectedAssistant,
      message: newMessage,
    }


    if (baseUrl) {
      try {
        const response = await axios.post(`${baseUrl}/api/assistant/response`, requestData)

        if (response.status === 200) {
          setIsLoading(false)
          const new_message: IMessage = {
            id: response.data.data.id,
            messageType: false,
            message: response.data.data.message,
            responseConfidence: response.data.data.confidenceScore
          }

          const confidenceScore: number = response.data.data.confidenceScore
          console.log(`Confidence score: ${confidenceScore}`)
          updateChatHistory(new_message)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Server response error."
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const formatText = (text: string) => {
    return text.replace(/\n/g, '<br/>');
  };

  return (
    <main className={'flex flex-col justify-end min-h-[100dvh] max-h-[100dvh] w-full sm:w-3/4 overflow-hidden'}>
      {chatHistory.length === 0 ? (
        <section className={"w-2/3 flex flex-col gap-10 items-center justify-center mx-auto my-auto"}>
          <h1 className={"text-4xl text-center text-secondary text-gray-600 font-bold"}>{selectedAssistant.name}</h1>
          <p className={"text-l text-center text-gray-600 font-semibold"}>{selectedAssistant.description}</p>
        </section>) : (
        <ScrollArea className={'flex flex-col mt-[7dvh] justify-end h-full w-full sm:w-3/4 mx-auto'}>
          <div className={"p-1/2 sm:p-4 flex flex-col justify-end w-full min-h-full sm:w-full mx-auto self-end"}>
            {chatHistory.map((message) => (
              <div key={message.id}
                   className={`h-full my-1 sm:my-2 p-2 flex flex-col m-2 rounded-2xl + ${message.messageType ?
                     "bg-secondary p-2 sm:p-3 sm:px-4 text-end self-end justify-end"
                     :
                     "bg-background sm:p-4"}`}
              >
                <div className={'flex col'}>
                  {!message.messageType ? <BotMessageSquare className={'size-8 w-12'}/> : null}
                  <div className={"w-full"}>
                    <p className={"text-l xm:text-xl w-full"}
                       dangerouslySetInnerHTML={{__html: formatText(message.message)}}/>
                    {!message.messageType ?
                      <h4 className={"text-gray-600 w-full flex text-sm items-end mt-1"}>Response
                        confidence: {message.responseConfidence}</h4>
                    : null}
                  </div>
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className={"flex items-center h-8 my-1 sm:my-2 p-1 m-2 sm:p-4 rounded-2xl"}>
                <BotMessageSquare className={'size-8 w-14'}/>
                <Skeleton className={"w-36 h-4"}/>
              </div>
            ) : null}
            <div ref={chatEndRef}/>
          </div>
        </ScrollArea>
      )}

      <section className={"flex gap-2 w-full sm:w-3/4 p-2 mx-auto"}>
        <DropdownMenu>
          <DropdownMenuTrigger><ChevronUp/></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={assistantChecked} onValueChange={
              setAssistantChecked
            }>
              {assistants.map(assistant => (
                <DropdownMenuRadioItem key={assistant.id} value={`${assistant.name}`} onClick={() => {
                  setSelectedAssistant(assistant)
                }}>
                  {assistant.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Form {...messageForm}>
          <form onSubmit={messageForm.handleSubmit(onSubmit)} className={'flex mx-auto w-full gap-1'}>
            <FormField
              control={messageForm.control}
              name={'message'}
              render={({field}) => (
                <FormItem className={"w-full"}>
                  <FormControl>
                    <Input placeholder={"Message..."} {...field} className={"h-12 text-xl"}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"} className={"h-12 w-12"}><Send className={"h-10 w-10"}/></Button>
          </form>
        </Form>
      </section>

    </main>
  );
};