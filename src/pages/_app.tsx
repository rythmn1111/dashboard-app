import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TaskProvider } from "@/context/TaskContext";
export default function App({ Component, pageProps }: AppProps) {
  return <TaskProvider>
    <Component {...pageProps} />
  </TaskProvider>
}
