import React from 'react';

import Image from 'next/image'

import firstAssistantImg from "@/public/examples-page/1.jpg"
import secondAssistantImg from "@/public/examples-page/2.jpg"
import thirdAssistantImg from "@/public/examples-page/3.jpg"
import IAssistant from "@/interfaces/iAssistant";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

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


const Page = () => {

  const formatText = (text: string) => {
    return text.replace(/\n/g, '<br/>');
  };

  return (
    <div className="w-full mt-[60px]">
      <section className={"relative w-full h-[400px]"}>
        <div className={"relative w-full h-full"}>
          <Image className={"object-cover w-full h-full"}
                 src={firstAssistantImg} alt="home-page-banner" loading='lazy' placeholder="blur" unoptimized={true}/>
          <div className={"bg-black absolute top-0 h-full w-full opacity-80"}/>
        </div>
        <div className={"z-30 absolute top-0 h-full w-full flex flex-col items-center justify-between py-16"}>
          <h1 className={"text-3xl font-bold text-center px-2 md:text-5xl text-white"}>{assistants[0].name}</h1>
          <p className={"text-l font-bold p-4 text-center text-white md:w-[700px]"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[0].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>
            <Link href={'/chat/DBN_assistant'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
      <Separator className={"my-2 w-full"}/>
      <section className={"relative w-full h-[400px]"}>
        <div className={"relative w-full h-full"}>
          <Image className={"object-cover w-full h-full"}
                 src={secondAssistantImg} alt="home-page-banner" loading='lazy' placeholder="blur" unoptimized={true}/>
          <div className={"bg-black absolute top-0 h-full w-full opacity-60"}/>
        </div>
        <div className={"z-30 absolute top-0 h-full w-full flex flex-col items-center justify-between py-16"}>
          <h1 className={"text-3xl font-bold text-center px-2 text-white md:text-5xl"}>{assistants[1].name}</h1>
          <p className={"text-l font-semibold p-4 text-center text-white md:w-[700px]"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[1].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>
            <Link href={'/chat/General_knowledge_DEMO_assistant'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
      <Separator className={"my-2 w-full"}/>
      <section className={"relative w-full h-[400px]"}>
        <div className={"relative w-full h-full"}>
          <Image className={"object-cover w-full h-full"}
                 src={thirdAssistantImg} alt="home-page-banner" loading='lazy' placeholder="blur" unoptimized={true}/>
          <div className={"bg-black absolute top-0 h-full w-full opacity-60"}/>
        </div>
        <div className={"z-30 absolute top-0 h-full w-full flex flex-col items-center justify-between py-16"}>
          <h1 className={"text-3xl font-bold text-center px-2 text-white md:text-5xl"}>{assistants[2].name}</h1>
          <p className={"text-l font-semibold p-4 text-center text-white md:w-[700px]"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[2].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>
            <Link href={'/chat/HelpDesk_assistant'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;