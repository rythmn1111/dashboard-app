import React from "react";

import { Button } from "@/components/ui/button"
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
  
export default function Cali({ className }: Task_TabProps){
    return <>
     <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
      <iframe
          src="https://calendar.google.com/calendar/embed?src=rythmnmagnani0%40gmail.com&ctz=Asia%2FKolkata"
          style={{ 
            border: 0, 
            width: '100%', 
            height: '600px' 
          }}
          frameBorder="0"
          scrolling="no"
        />
      </CardContent>
    </Card>
    </>
}