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
    <header className={'w-full bg-background'}>
      <div className={`${styles.headerContainer} h-16 px-6 md:w-3/5 w-full mx-auto`}>
        <aside className={`${styles.logoContainer} h-10`}>
          <h1 className={'text-2xl font-bold'}>AiHelperHub</h1>
        </aside>

        <nav className={`${styles.navContainer} gap-4`}>
          <Link href='/' className={'text-xl'}>Home</Link>
          <Link href='/' className={'text-xl'}>About</Link>
          <Link href='/' className={'text-xl'}>Contact</Link>
        </nav>

        <aside className={`${styles.asideContainer} gap-2`}>
          <Button className={`${styles.tryButton}  text-10`} variant='secondary' asChild>
            <Link href='/'>Try <ArrowUpRight className={'h-10'}/></Link>
          </Button>

          <ModeToggle/>

          <div className={styles.sheetContainer}>
            <Sheet>
              <SheetTrigger>
                <Menu className={'flex align-center justify-center'}/>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle className={'text-3xl'}>AiHelperHub</SheetTitle>
                  <SheetDescription className={'flex flex-col'}>
                    <Link href='/' className={'text-2xl '}>Home</Link>
                    <Link href='/' className={'text-2xl'}>About</Link>
                    <Link href='/' className={'text-2xl'}>Contact</Link>
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