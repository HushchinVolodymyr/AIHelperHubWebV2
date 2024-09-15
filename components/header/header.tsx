import React from 'react';
import styles from './header.module.scss'
import {ModeToggle} from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Menu, ArrowUpRight} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
  return (
    <header className={'absolute z-50 top-0 w-full bg-background h-[8vh] sm:h-16'}>
      <div className={`${styles.headerContainer} px-6 md:w-3/5 w-full h-full mx-auto`}>
        <aside className={`${styles.logoContainer} h-10`}>
          <Link href={'/'} className={'text-3xl xm:text-2xl font-bold'}>AiHelperHub</Link>
        </aside>

        <nav className={`${styles.navContainer} gap-4`}>
          <Link href='/' className={'text-xl'}>Home</Link>
          <Link href='/examples' className={'text-xl'}>Examples</Link>
          <Link href='tel:+380930860580' className={'text-xl'}>Contact</Link>
        </nav>

        <aside className={`${styles.asideContainer} gap-2 h-full `}>
          <Button className={`${styles.tryButton}  text-10`} variant='secondary' asChild>
            <Link href='/chat'>Try <ArrowUpRight className={'h-10'}/></Link>
          </Button>

          <div className={"flex items-center justify-center h-full"}> 
            <ModeToggle/>
          </div>

          <div className={`${styles.sheetContainer} `}>
            <Sheet>
              <SheetTrigger className={"flex items-center justify-center h-full"}>
                <Menu className={'flex align-center justify-center scale-120 my-auto size-8'}/>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle className={'text-3xl'}>AiHelperHub</SheetTitle>
                  <SheetDescription className={'flex flex-col'}>
                    <Link href='/' className={'text-2xl '}>Home</Link>
                    <Link href='/examples' className={'text-2xl'}>Examples</Link>
                    <Link href='tel:+380930860580' className={'text-2xl'}>Contact</Link>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Header;