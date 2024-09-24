"use client"
import React, {useEffect, useState} from 'react';
import styles from './header.module.scss'
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
import IUser from "@/interfaces/iUser";
import {redirect, usePathname} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {logout} from "@/services/auth";


const Header = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const pathname = usePathname();
  const [ shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [pathname]);
  
  const handleLogout = async () => {
    await logout()
    setUser(null);
    setShouldRedirect(true)
  }

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/login");
    }
  }, [shouldRedirect]);
  
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
          {!user ?
            <Button className={`${styles.tryButton}`} variant='secondary' asChild>
              <Link href='/login'>Login</Link>
            </Button> : null
          }
          <div className={`${styles.toggleContainer}`}>
            <ModeToggle/>
          </div>

          {user ?
            <DropdownMenu>
              <DropdownMenuTrigger className={styles.userDropDownTrigger}>
                {user.username}
                <ChevronDown/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"mt-2 mr-4"}>
                <DropdownMenuGroup>
                  <DropdownMenuItem className={styles.userDropDownItem}>
                    <Link href={"/profile"} className={"text-xl"}>Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup >
                <Separator className={"my-1"}></Separator>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem className={styles.userDropDownItem}>
                    <button className={"text-xl"} onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu> : null
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