import * as React from "react"
import Task_Tab from "@/components/tasks-tab/task-tab"
import Terminal from "@/components/terminal/terminal"
import Cali from "@/components/cali/cali"
import Reminder from "@/components/reminder/reminder"
export default function Home() {
  return <>
      <Terminal />  
  <div className="h-screen w-full flex justify-center items-center mx-auto w-11/12">
    <div className="grid h-full w-full gap-3 md:grid-cols-3 grid-rows-4 p-5">
      <div className="grid grid-rows-2 row-span-4 col-span-1  gap-3">
      <Task_Tab />
      <Reminder />  
      </div>
      <div className="w-full h-full col-span-2 row-span-4"><Cali /></div>
    </div>    
  </div>
  </>
}