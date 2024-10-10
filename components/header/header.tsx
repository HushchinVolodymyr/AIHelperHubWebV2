"use client"
import React from 'react';
import styles from './header.module.scss';
import {ModeToggle} from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronDown, Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
// import IUser from "@/interfaces/iUser";
// import {redirect, usePathname} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import { useAuth } from '@/services/auth'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerContainer}`}>
        <aside className={`${styles.logoContainer}`}>
          <Link href={'/'} className={`${styles.logoLink}`}>AiHelperHub</Link>
        </aside>

        <nav className={`${styles.navContainer}`}>
          <Link href='/' className={`${styles.navLink}`}>Home</Link>
          <Link href='/examples' className={`${styles.navLink}`}>Examples</Link>
          <Link href='tel:+380930860580' className={`${styles.navLink}`}>Contact</Link>
        </nav>

        <aside className={`${styles.asideContainer}`}>
          {!user.isAuthenticated  ?
            <Button className={`${styles.tryButton}`} variant='secondary' asChild>
              <Link href='/login'>Login</Link>
            </Button> : null
          }
          <div className={`${styles.toggleContainer}`}>
            <ModeToggle/>
          </div>

          {user.isAuthenticated ?
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className={styles.userDropDownTrigger}>
                  <div className={styles.userDropDowmData}>
                    <h1 className={styles.usernameData}>{user.username}</h1>
                    <p className={styles.emailData}>{user.email}</p>
                  </div>
                  <ChevronDown/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"mt-2 mr-4"}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className={styles.userDropDownItem}>
                      <Link href={"/profile"} className={"text-xl"}>Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <Separator className={"my-1"}></Separator>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className={styles.userDropDownItem}>
                      <button className={"text-xl"} onClick={logout}>Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> : null

          }

          <div className={`${styles.sheetContainer}`}>
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