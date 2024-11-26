import * as React from "react"
import Task_Tab from "@/components/tasks-tab/task-tab"
import Terminal from "@/components/terminal/terminal"

export default function Home() {
  return <>
    <Terminal />  
    <Task_Tab />
  </>
}