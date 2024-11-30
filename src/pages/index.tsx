import * as React from "react"
import Task_Tab from "@/components/tasks-tab/task-tab"
import Terminal from "@/components/terminal/terminal"
import Cali from "@/components/cali/cali"
import Reminder from "@/components/reminder/reminder"
export default function Home() {
  return <>
      <Terminal />  
  <div className="h-screen mx-auto md:w-11/12">
    <div className="flex md:flex-row flex-col h-full w-full gap-3 p-5">
      <div className=" w-full lg:w-1/2 grid grid-rows-2 gap-3">
      <Task_Tab />
      <Reminder />  
      </div>
      <div className="grid w-full  row-span-2"><Cali /></div>
    </div>    
  </div>
  </>
}