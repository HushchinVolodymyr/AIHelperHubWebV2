"use client"
import React, { useEffect } from 'react';
import styles from './header.module.scss';
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch } from 'react-redux';
import { logout as logoutRedux } from '@/store/userSlice';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/use-auth'
import { getUser } from "@/services/user-service";
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, logout } = useAuth()
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const response = await getUser();
      if (!response || response === 401) {
        dispatch(logoutRedux());
      }
    }

    fetchUser();
  }, [user]);

  // logout action for button
  const logoutAction = async () => {
    // if logout success redirect to login page
    if (await logout()) {
      // Redirecting
      router.push("/login");

      return true;
    }

    return false;
  }

  // const toastCall = () => {
  //   toast({variant: "default", title: "Toast", description: "Hello world!" })
  // }

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
          {!user.isAuthenticated ?
            <Button className={`${styles.tryButton}`} variant='secondary' asChild>
              <Link href='/login'>Login</Link>
            </Button> : null
          }
          <div className={`${styles.toggleContainer} hidden xs:block`}>
            <ModeToggle />
          </div>

          {user.isAuthenticated ?
            <div>
              <div className={"lg:hidden"}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant={"outline"} className={"p-2 h-[48px] w-[48px]"}>
                      <User />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"mt-2 mr-4"}>
                    <DropdownMenuGroup>
                      <h3 className={"p-4"}>
                        {user.username}
                      </h3>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className={styles.userDropDownItem}>
                        <Link href={"/profile"} className={"text-xl w-full"}>Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <Separator className={"my-1"}></Separator>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className={styles.userDropDownItem}>
                        <button className={"text-xl w-full text-start"} onClick={logoutAction}>Logout</button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className={"hidden lg:block"}>
                <DropdownMenu>
                  <DropdownMenuTrigger className={styles.userDropDownTrigger}>
                    <div className={styles.userDropDowmData}>
                      <h1 className={styles.usernameData}>{user.username}</h1>
                      <p className={styles.emailData}>{user.email}</p>
                    </div>
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"mt-2 mr-4"}>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className={styles.userDropDownItem}>
                        <Link href={"/profile"} className={"text-xl w-full"}>Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <Separator className={"my-1"}></Separator>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className={styles.userDropDownItem}>
                        <button className={"text-xl w-full text-start"} onClick={logoutAction}>Logout</button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div> : null
          }

          <div className={`${styles.sheetContainer}`}>
            <Sheet>
              <SheetTrigger className={"flex items-center justify-center h-full"}>
                <Menu className={'flex align-center justify-center scale-120 my-auto size-8'} />
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader className={"mt-4"}>
                  <SheetTitle className={'text-3xl flex items-center justify-between'}>
                    <div className={"w-[48px]"} />
                    <h1>
                      AiHelperHub
                    </h1>
                    <div className={`${styles.toggleContainer} mt-2`}>
                      <ModeToggle />
                    </div></SheetTitle>
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