import React from 'react';

import styles from './home-page.module.scss'

import homePageBanner from '@/public/home-page/home-page-banner.jpg'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, ChartNetwork, ChevronsRight, HandCoins, TimerReset, User, Users} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {ICardData} from "@/interfaces/iImage";

import firstProblemImg from '@/public/home-page/problems-section/1.jpg'
import secondProblemImg from '@/public/home-page/problems-section/2.jpg'
import thirdProblemImg from '@/public/home-page/problems-section/3.jpg'
import fourthProblemImg from '@/public/home-page/problems-section/4.jpg'

import firstFuncImg from '@/public/home-page/functions-section/1.jpg'
import secondFuncImg from '@/public/home-page/functions-section/2.jpg'
import thirdFuncImg from '@/public/home-page/functions-section/3.jpg'
import fourthFuncImg from '@/public/home-page/functions-section/4.jpg'
import fivthFuncImg from '@/public/home-page/functions-section/5.jpg'
import sixthFuncImg from '@/public/home-page/functions-section/6.jpg'

const problems: ICardData[] = [
  {
    img: firstProblemImg,
    mainText: "Long Waits",
    description: "Customers are forced to wait for a long time for responses to their queries."
  },
  {
    img: secondProblemImg,
    mainText: "Low efficiency of solutions",
    description: "Quality of solutions and their accuracy leave much to be desired."
  },
  {
    img: thirdProblemImg,
    mainText: "Employee overload",
    description: "Help desk employees experience significant stress due to the large volume of requests."
  },
  {
    img: fourthProblemImg,
    mainText: "Outdated methods of communication",
    description: "AI tool could use the modern chatbots with fast responses to answer visitor questions"
  }
]

const functions: ICardData[] = [
  {
    img: firstFuncImg,
    mainText: "Automatic resolution of recurring requests",
    description: "The system will be able to independently recognize and resolve recurring customer requests, freeing help desk employees from monotonous"
  },
  {
    img: secondFuncImg,
    mainText: "Proposing solutions based on historical data analysis",
    description: "The system will analyze the request history and propose the most likely solutions based on accumulated experience"
  },
  {
    img: thirdFuncImg,
    mainText: "Personalized customer experience",
    description: "Using data from previous customer interactions, the system will be able to offer personalized solutions and recommendations"
  },
  {
    img: fourthFuncImg,
    mainText: "Automatic knowledge base update",
    description: "The system will automatically update the help desk knowledge base based on new data and feedback from customers."
  },
  {
    img: fivthFuncImg,
    mainText: "Multichannel",
    description: "Your assistant can be connected to various communication channels such as your website, WhatsApp, Instagram and Telegram."
  },
  {
    img: sixthFuncImg,
    mainText: "AI",
    description: "The introduction of an artificial intelligence system will allow us to significantly increase the efficiency of the help desk, reduce response time to customer requests and improve the quality of services provided."
  },
]

const Home = () => {
  return (
    <main className={`${styles.homePageContainer} `}>
      <section className={`${styles.bannerSection} h-96 overflow-hidden`}>
        <Image className={`${styles.bannerImg}  h-full object-cover`}
               src={homePageBanner} alt="home-page-banner" loading='lazy' placeholder="blur" unoptimized={true}/>

        <div className={'absolute top-0 h-full w-full bg-black opacity-30'}></div>

        <div className={`${styles.bannerDescription} gap-8 h-96 font-bold top-0 p-4 text-slate-50 text-center`}>
          <h1 className={'text-4xl md:text-6xl'}>AIHelperHub</h1>
          <p className={'text-xl md:text-2xl w-3/4 '}>Optimizing support work and improving communication with the
            client
            through the introduction of AI Assistant</p>
          <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>Try<ArrowUpRight
            className={'h-10'}/></Button>
        </div>
      </section>

      <section className={`${styles.businessSection} max-w-3/4 py-8 px-4 gap-8 md:p-10 text-center bg-secondary`}>
        <h1 className={'text-4xl font-bold'}>Business case</h1>
        <p className={'md:w-3/4 text-xl'}>
          With the development of technology and time, customers who contact support services want quick communication
          and communication to solve their problems. Help desks play a key role in providing customer support and
          solving user problems. However, as the number of customers and the volume of requests increases, many service
          desks are faced with serious problems such as longer wait times, decreased quality of service, and overloaded
          employees. In such a situation, it is necessary to apply innovative approaches to optimize the work of the
          help desk.
        </p>
      </section>

      <section className={`${styles.problemsSection} py-8 px-4 gap-8 md:p-10 text-center sm:w-3/4 sm:mx-auto`}>
        <h1 className={'text-4xl font-bold'}>Problems</h1>

        <div className={'sm:w-full'}>
          <Carousel className="w-80 max-w-xs sm:w-full sm:max-w-7xl sm:mx-auto">
            <CarouselContent className={"flex"}>
              {problems.map((problem, index) => (
                <CarouselItem key={index} className={"flex-none w-full min-w-sm max-w-sm"}>
                  <Card>
                    <CardContent className=" flex aspect-square items-center justify-center p-0 text-white">
                      <div className={'relative'}>
                        <Image className={'rounded-2xl'}
                               src={problem.img} alt={problem.mainText} loading='lazy' placeholder="blur"
                               unoptimized={true}/>
                        <div className='absolute w-full inset-0 bg-black opacity-20 rounded-2xl'></div>
                      </div>
                      <div className={'absolute min-w-sm max-w-sm top-0 w-full p-4 mt-8 flex flex-col gap-8 '}>
                        <h1 className={"font-bold text-2xl sm:text-3xl"}>{problem.mainText}</h1>
                        <p className={"font-semibold text-xl sm:text-2xl "}>{problem.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`${styles.carouselLeft}`}/>
            <CarouselNext className={`${styles.carouselRight}`}/>
          </Carousel>

          <div className={"flex justify-center items-center gap-1 mt-2 xm:hidden text-xl"}>Swipe <ChevronsRight
            className={'h-8 self-center'}/></div>
        </div>
      </section>

      <section className={`${styles.whatWeDoSection} max-w-3/4 py-8 px-4 gap-8 md:p-10 text-center bg-secondary`}>
        <h1 className={'text-4xl font-bold'}>What we do</h1>
        <p className={'md:w-3/4 text-xl'}>
          We are enhancing customer satisfaction and increasing financial efficiency through the AI technologies
          application via continuously improving support accessibility while reducing operational costs. Our mission is
          to promote AI technologies that enhance service quality without adding extra routine tasks for people.
        </p>
      </section>

      <section className={`${styles.problemsSection} py-8 px-4 gap-8 md:p-10 text-center sm:w-3/4 sm:mx-auto`}>
        <h1 className={'text-4xl font-bold'}>Key functions that the AI system will perform include</h1>

        <div className={'sm:w-full'}>
          <Carousel className="w-80 max-w-xs sm:w-full sm:max-w-7xl sm:mx-auto">
            <CarouselContent className={"flex"}>
              {functions.map((problem, index) => (
                <CarouselItem key={index} className={"flex-none w-full min-w-sm max-w-sm"}>
                  <Card>
                    <CardContent className=" flex aspect-square items-center justify-center p-0 text-white">
                      <div className={'relative'}>
                        <Image className={'rounded-2xl'}
                               src={problem.img} alt={problem.mainText} loading='lazy' placeholder="blur"
                               unoptimized={true}/>
                        <div className='absolute w-full inset-0 bg-black opacity-20 rounded-2xl'></div>
                      </div>
                      <div className={'absolute min-w-sm max-w-sm top-0 w-full p-4 mt-8 flex flex-col gap-8 '}>
                        <h1 className={"font-bold text-2xl sm:text-3xl"}>{problem.mainText}</h1>
                        <p className={"font-semibold text-xl sm:text-2xl "}>{problem.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`${styles.carouselLeft}`}/>
            <CarouselNext className={`${styles.carouselRight}`}/>
          </Carousel>

          <div className={"flex justify-center items-center gap-1 mt-2 xm:hidden text-xl"}>Swipe <ChevronsRight
            className={'h-8 self-center'}/></div>
        </div>
      </section>

      <section className={"max-w-full py-8 px-4 gap-8 md:p-10 text-center bg-secondary"}>
        <h1 className={'text-4xl font-bold'}>Benefits of automation</h1>

        <div className={'flex flex-col gap-8 mt-10 max-w-full md:max-w-3/4'}>
          <div className={"flex justify-center gap-8 md:w-3/5 mx-auto"}>
            <Card className={"w-1/2 bg-secondary"}>
              <CardContent className={"flex flex-col items-center"}>
                <Users className={"size-20"}/>
                <h1 className={"text-xl font-semibold mt-4 sm:text-2xl"}>Reduced workload for employees</h1>
              </CardContent>
            </Card>
            <Card className={"w-1/2 bg-secondary"}>
              <CardContent className={"flex flex-col items-center"}>
                <TimerReset className={"size-20"}/>
                <h1 className={"text-xl font-semibold mt-4 sm:text-2xl"}>Reduced response time</h1>
              </CardContent>
            </Card>
          </div>

          <div className={"flex justify-center gap-8 md:w-3/5 mx-auto"}>
            <Card className={"w-1/2 bg-secondary"}>
              <CardContent className={"flex flex-col items-center"}>
                <ChartNetwork className={"size-20"}/>
                <h1 className={"text-xl font-semibold mt-4 sm:text-2xl"}>Increased Efficiency and Accuracy</h1>
              </CardContent>
            </Card>
            <Card className={"w-1/2 bg-secondary"}>
              <CardContent className={"flex flex-col items-center"}>
                <User className={"size-20"}/>
                <h1 className={"text-xl font-semibold mt-4 sm:text-2xl"}>Increased customer satisfaction</h1>
              </CardContent>
            </Card>
          </div>

          <div className={"flex justify-center gap-8 md:w-3/5 mx-auto"}>
            <Card className={"w-1/2 bg-secondary"}>
              <CardContent className={"flex flex-col items-center"}>
                <HandCoins className={"size-20"}/>
                <h1 className={"text-xl font-semibold mt-4 sm:text-2xl"}>Saving time and resources</h1>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className={"flex flex-col items-center max-w-full py-8 px-4 gap-8 md:p-10 text-center"}>
        <h1 className={'text-4xl font-bold'}>Overall</h1>
        <p className={'md:w-3/4 text-xl text-center'}>
          Help desk automation using artificial intelligence promises to significantly improve operational efficiency
          and customer experience, which will be a key competitive advantage for your company.
        </p>
        <Button variant={'outline'} className={'text-2xl p-6 text-foreground'}>Try<ArrowUpRight
          className={'h-10'}/></Button>
      </section>
    </main>
  );
};

export default Home;