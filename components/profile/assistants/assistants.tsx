"use client"
import React, { useEffect, useState } from 'react';
import styles from './assistants.module.scss'
import IAssistant from "@/interfaces/iAssistant";
import { deleteUserAssistant, userAssistantsList } from "@/services/assistant-service";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Assistants = () => {
  // Define assistants list state
  const [assistants, setAssistants] = useState<IAssistant[]>([])

  // Get assistants list from server (works once when component mount)
  useEffect(() => {
    // Async function to fetch and set assistants list
    const fetchAssistants = async () => {
      // Fetch assistants 
      const response = await userAssistantsList();

      // Set assistants in state
      setAssistants(response);
    }

    // Call function
    fetchAssistants()
  }, [])

  //Delete user and get new list
  const deleteAssistantClickAction = async (id: number | null) => {
    if (await deleteUserAssistant(id)) {
      // Get actual assistants list for user
      const userAssistants = await userAssistantsList();

      // Set assistants in state
      setAssistants(userAssistants);

      // Return success after actions
      return true;
    }

    // Rise error and return
    toast({ variant: "destructive", title: "Error", description: "Delete assistant error" });
    return false;
  }

  return (
    <div className={`${styles.pageConatainer}`}>
      <section className={""}>
        {assistants.map((assistant, index) => (
          <div key={index}
            className={'w-full flex items-center justify-between p-4 bg-accent rounded-md shadow-sm mb-4'}
          >
            <div className={'flex gap-4 items-center'}>
              <h1 className={'text-xl'}>{index + 1}</h1>
              <div>
                <h1 className={'text-xl'}>{assistant.name}</h1>
                <h2 className={'text-l'}>{assistant.description}</h2>
              </div>
            </div>
            <div className={'flex gap-2 items-center'}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          className={'h-12 w-12 p-1'}
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your assistant
                            and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              variant={"destructive"}
                              onClick={() => { deleteAssistantClickAction(assistant.id) }}
                            >
                              Delete
                            </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <h1>Delete assistant</h1>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      className={'h-12 w-12 p-1'}
                      variant={"default"}
                    >
                      <Pencil />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <h1>Edit assistant</h1>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Assistants;