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

// const messages: IMessage[] = [
//   {
//     id: 1,
//     messageType: true,
//     message: "Hello, how are you?"
//   },
//   {
//     id: 2,
//     messageType: false,
//     message: "Hi, I`m fine and you?"
//   },
//   {
//     id: 3,
//     messageType: true,
//     message: "Its okay"
//   },
//   {
//     id: 4,
//     messageType: false,
//     message: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born " +
//       "and I will give you a complete account of the system, and expound the actual teachings of the great explorer " +
//       "of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, " +
//       "because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter c" +
//       "on sequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain" +
//       " of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure " +
//       "him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, " +
//       "except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a " +
//       "pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
//   }
// ]

const assistants: IAssistant[] = [
  {
    id: 1,
    name: "DBN assistant"
  },
  {
    id: 2,
    name: "General knowledge DEMO assistant"
  },
  {
    id: 3,
    name: "HelpDesk_assistant"
  }
]

const messageFormSchema = z.object({
  message: z.string(),
})

const Page = () => {
  const messageForm = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: ""
    }
  });

  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [assistantChecked, setAssistantChecked] = useState<string>(assistants[0].name)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

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
        const response = await axios.post(baseUrl, {requestData})

        if (response.status === 200) {
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
    <main className={'flex flex-col justify-end h-[92vh] w-full sm:w-3/4 overflow-hidden'}>
      <ScrollArea className={'flex flex-col justify-end h-full w-full sm:w-3/4 mx-auto'}>
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

export default Page;