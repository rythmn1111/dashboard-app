import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  interface Task_TabProps {
    className?: string;
  }
  
export default function Reminder({ className }: Task_TabProps){
    return <>
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Reminder</CardTitle>
      </CardHeader>
      <CardContent>
    
      </CardContent>
    </Card>
    </>
}