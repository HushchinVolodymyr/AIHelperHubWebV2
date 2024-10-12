import React from 'react';
import styles from './create-assistant.module.scss'

import {z} from 'zod'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast";
import IAssistantCreate from "@/interfaces/iAssistantCreate";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";
import {BadgePlus} from "lucide-react";
import {RootState, AppDispatch} from "@/store/store";

// Create assistant schema
const creatAssistantFromSchema = z.object({
  name: z.string()
    .min(1, {message: 'Name is required'})
    .max(256, {message: 'Name is so long'}),
  description: z.string()
    .max(512, {message: 'Description is so long, must be no more than 512'}),
  instructions: z.string()
    .max(256000, {message: 'Instructions is so long'}),
  temperature: z.number()
    .min(0)
    .max(2),
  model: z.string()
    .min(1),  
})

const CreateAssistant = () => {
  // Redux dispatcher
  const dispatch = useDispatch<AppDispatch>();
  // Assistant state
  const assistant = useSelector((state: RootState) => state.assistant)

  // Create assistant form and assign default values
  const createAssistantForm = useForm<z.infer<typeof creatAssistantFromSchema>>({
    resolver: zodResolver(creatAssistantFromSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      temperature: 1,
      model: ''
    }
  })

  // Assistant create submit
  async function submitCreateAssistant(values: z.infer<typeof creatAssistantFromSchema>) {
    // Check empty required inputs (name, model)
    if (values.name.trim() === "" ||
      values.model.trim() === "") {
      toast({variant: "destructive", title: "Empty fields", description: "Please fill all fields"})
      return
    }

    // Create DTO object for request
    const createAssistantDto: IAssistantCreate = {
      model: values.model,
      name: values.name,
      instructions: values.instructions,
      description: values.description,
      temperature: values.temperature,
    }

    await console.log(createAssistantDto)
  }

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Create Assistant</h1>
      <div className={`gap-10 w-full mx-auto mt-4 md:flex md:w-3/4`}>
        <section className={`md:w-1/2`}>
          <Form {...createAssistantForm}>
            <form className={`flex flex-col gap-2`}
                  onSubmit={createAssistantForm.handleSubmit(submitCreateAssistant)}>
              <FormField
                control={createAssistantForm.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={"Assistant name"} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your assistant name.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={createAssistantForm.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder={"Assistant description)"} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your assistant description. Max size 512 characters.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={createAssistantForm.control}
                name="instructions"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea placeholder={"Assistant instructions)"} {...field} />
                    </FormControl>
                    <FormDescription>
                      Please write here instructions for you assistant. Think through the instructions: the more precise they are, the better the assistant will work.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={createAssistantForm.control}
                name="model"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Assistant model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assistant model"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"gpt-4"}>Gpt-4</SelectItem>
                        <SelectItem value={"gpt-3o"}>Gpt-3o</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your assistant model
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={createAssistantForm.control}
                name="temperature"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Temperature: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        defaultValue={[1]}
                        max={2}
                        min={0}
                        step={0.1}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it
                      more focused and deterministic.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              { !createAssistantForm.formState.isValid ?
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className={"mt-14 w-full"}>
                      <Button
                      type="submit"
                      className={'w-full flex gap-1 text-l'}
                      disabled
                    >
                        <BadgePlus/>Create</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      You need fill create form.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> :
                <Button
                  type="submit"
                  className={'mt-14 flex gap-1 text-l'}
                ><BadgePlus/>Create</Button>
              }
              
              
              
            </form>
          </Form>
        </section>
        <section className={`md:w-1/2 flex items-center justify-center`}>
          {assistant.id == null ?
            <h1 className={`text-3xl text-secondary`}>Assistant not created</h1>
            :
            <h1>{assistant.id}</h1>
          }
        </section>
      </div>
    </div>
  );
};

export default CreateAssistant;