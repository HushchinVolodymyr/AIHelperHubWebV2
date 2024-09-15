import React from 'react';
import Link from 'next/link';
import {Button} from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="h-[92vh] flex flex-col items-center justify-center text-center">
      <h1 className={"text-3xl font-semibold"}>Such page Not Found</h1>
      <Button asChild variant={"secondary"} className={"mt-4"}>
        <Link href="/">Return to home page!</Link>  
      </Button>
    </div>
  );
};

export default NotFound;