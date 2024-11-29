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
        <CardTitle>reminder</CardTitle>
      </CardHeader>
      <CardContent>
      <p>hello</p>
      </CardContent>
    </Card>
    </>
}