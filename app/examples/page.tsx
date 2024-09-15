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
    description: "State Building Standards of Ukraine\n" +
      "\n" +
      "Explore the comprehensive State Building Norms of Ukraine focusing on the engineering protection of territories, buildings, and structures from landslides and collapses. The norms cover essential requirements for engineering surveys, assessment of environmental impact, seismic influences on slopes, and scientific-technical support throughout the life cycle of engineering protection structures.\n" +
      "\n" +
      "These standards are mandatory for the development of project documentation for new construction, reconstruction, major repairs, and technical re-equipment of engineering protection structures, harmonized with existing regulatory documents regarding terms and definitions.\n" +
      "\n" +
      "Delve into the detailed requirements and criteria outlined in the State Building Standards of Ukraine concerning the construction and engineering protection of territories, buildings, and structures against landslides and collapses."
  },
  {
    id: 2,
    name: "General knowledge DEMO assistant",
    description: "Creating a Facebook Page:\n" +
      "\n" +
      "Are you looking to establish a presence on Facebook for your business, brand, or organization? Follow these simple steps to create your own Facebook Page:\n" +
      "\n" +
      "Visit the link provided by Facebook to access the \"Create A Page\" page.\n" +
      "Select the type of page you want to create (e.g., business).\n" +
      "Enter essential information about your business, including the name, category, contact details, and address.\n" +
      "Upload a profile picture and cover images that represent your business effectively.\n" +
      "Choose a username (vanity URL) for your page.\n" +
      "Add more details about your business to provide visitors with key information.\n" +
      "Remember, creating a Facebook Page involves planning and attention to detail. Make sure to utilize high-quality images and provide comprehensive information to engage your audience effectively."
  },
  {
    id: 3,
    name: "HelpDesk_assistant",
    description: "Position Profile Overview:\n" +
      "\n" +
      "Our organization offers a diverse range of positions across multiple hardware sets, reflecting a comprehensive set of roles in the technology and development fields.\n" +
      "\n" +
      "Key Highlights:\n" +
      "\n" +
      "Delivery Management: From Delivery Directors to Delivery Managers, our teams are led by experienced professionals ensuring successful project outcomes.\n" +
      "Software Development: With dedicated managers and directors overseeing development processes, we ensure high-quality software solutions.\n" +
      "Technical Expertise: Technical Program Managers, Architects, and Leads bring advanced skills to the table for innovative solutions.\n" +
      "Specialized Roles: From SEO specialists to Business Analysts and Product Managers, we have dedicated experts in various domains.\n" +
      "Frontend Development: Expertise in Angular, React, Vue.JS, and more, ensuring cutting-edge frontend solutions.\n" +
      "Technology Stack: Proficiency in a wide range of technologies including PHP, Java, Scala, Big Data, Microsoft Stack, .Net, C#, Python, and more.\n" +
      "Mobile Development: Covering iOS and Android development, including specialized roles like Data Analysts, DBAs, and QA professionals.\n" +
      "Design and Creativity: From Game Designers to UX/UI Designers, our creative teams ensure visually appealing and user-friendly experiences.\n" +
      "Media and Graphics: Offering roles such as 2D/3D Artists, Animators, Motion Designers, and Videographers for diverse multimedia projects.\n" +
      "Explore our positions across various hardware sets to find the perfect fit for your skills and expertise."
  }
]

const Page = () => {

  const formatText = (text: string) => {
    return text.replace(/\n/g, '<br/>');
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <section className={"flex flex-col items-center mb-4 sm:flex-row sm:justify-center sm:items-stretch sm:mb-0"}>
        <div className={"relative sm:w-1/2"}>
          <Image className={"h-40 object-cover sm:h-[600px]"}
                 src={firstAssistantImg} alt={"first-assistant-img"} loading="lazy" placeholder={"blur"}
                 unoptimized={true}/>
          <div className={"absolute bg-black opacity-30 w-full h-40 top-0 sm:hidden"}/>
          <h1
            className={"absolute z-10 top-14 text-4xl font-semibold text-center w-full sm:hidden"}>{assistants[0].name}</h1>
        </div>
        <div className={"flex flex-col items-center sm:w-1/2"}>
          <h1 className={"hidden sm:block text-4xl font-semibold sm:my-10"}>{assistants[0].name}</h1>
          <Separator/>
          <p className={"p-4 text-l"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[0].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground sm:mt-8'}>
            <Link href={'/chat'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
      <section className={"flex flex-col items-center mb-4 sm:flex-row-reverse sm:mb-0"}>
        <div className={"relative sm:w-1/2"}>
          <Image className={"h-40 object-cover sm:h-[600px] sm:w-70 "}
                 src={secondAssistantImg} alt={"second-assistant-img"} loading="lazy" placeholder={"blur"}
                 unoptimized={true}/>
          <div className={"absolute bg-black opacity-30 w-full h-40 top-0 sm:hidden"}/>
          <h1
            className={"absolute z-10 top-14 text-4xl font-semibold text-center w-full sm:hidden"}>{assistants[1].name}</h1>
        </div>
        <div className={"flex flex-col items-center sm:w-1/2"}>
          <p className={"p-4 text-l"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[1].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>
            <Link href={'/chat'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
      <section className={"flex flex-col items-center mb-4 sm:flex-row sm:mb-0"}>
        <div className={"relative sm:w-1/2"}>
          <Image className={"h-40 object-cover sm:h-[600px] sm:w-70"}
                 src={thirdAssistantImg} alt={"third-assistant-img"} loading="lazy" placeholder={"blur"}
                 unoptimized={true}/>
          <div className={"absolute bg-black opacity-30 w-full h-40 top-0 xm:hidden"}/>
          <h1
            className={"absolute z-10 top-14 text-4xl font-semibold text-center w-full sm:hidden"}>{assistants[2].name}</h1>
        </div>
        <div className={"flex flex-col items-center sm:w-1/2"}>
          <p className={"p-4 text-l sm:text-md"}
             dangerouslySetInnerHTML={{__html: formatText(assistants[2].description)}}/>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>
            <Link href={'/chat'} className={'flex text-2xl p-6'}>Try<ArrowUpRight className={'h-10'}/></Link>
          </Button>
        </div>
      </section>
    </div>
);
};

export default Page;