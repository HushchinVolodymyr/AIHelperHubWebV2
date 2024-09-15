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
import {IRequestData} from "@/interfaces/iRequestData";
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
  }
]

const messageFormSchema = z.object({
  message: z.string(),
})

export default function Page({params}: {params: {assistantName: string}}) {
  const messageForm = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: ""
    }
  });

  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [assistantChecked, setAssistantChecked] = useState<string>(params.assistantName || assistants[0].name)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {    
    if (params.assistantName) {
      switch (params.assistantName){
        case "DBN_assistant":
          setAssistantChecked(assistants[0].name);
          break
        case "General_knowledge_DEMO_assistant":
          setAssistantChecked(assistants[1].name);
          break
        case "HelpDesk_assistant":
          setAssistantChecked(assistants[2].name);
          break
        default:
          setAssistantChecked(assistants[0].name);
      }
    } else {
      setAssistantChecked(assistants[0].name);
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
      toast({
        variant: "destructive",
        description: "Empty message!",
      })
      return
    }

    const updateChatHistory = (message: IMessage) => {
      setChatHistory(prevHistory => [...prevHistory, message]);
    }
    
    setIsLoading(true)

    const newMessage: IMessage = {
      id: chatHistory.length + 1,
      messageType: true,
      message: values.message
    }

    updateChatHistory(newMessage)
    messageForm.reset()

    const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_API_URL

    const requestData: IRequestData = {
      assistant: assistantChecked,
      message: newMessage,
    }


    if (baseUrl) {
      try {
        const response = await axios.post(baseUrl, requestData)

        if (response.status === 200) {
          setIsLoading(false)
          updateChatHistory(response.data.data)
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
    <main className={'flex flex-col justify-end h-screen w-full sm:w-3/4 overflow-hidden'}>
      <ScrollArea className={'flex flex-col mt-[7vh] justify-end h-full w-full sm:w-3/4 mx-auto'}>
        <div className={"p-1/2 sm:p-4 flex flex-col justify-end w-full min-h-full sm:w-full mx-auto self-end"}>
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

      <section className={"flex gap-2 w-full sm:w-3/4 p-2 mx-auto"}>
        <DropdownMenu>
          <DropdownMenuTrigger><ChevronUp/></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={assistantChecked} onValueChange={
              setAssistantChecked
            }>
              {assistants.map(assistant => (
                <DropdownMenuRadioItem key={assistant.id} value={assistant.name}>
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