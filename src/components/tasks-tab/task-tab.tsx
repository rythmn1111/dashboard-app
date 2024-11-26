import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Task_Tab() {
    return (
      
      <Card className="w-[350px] mx-9 my-10">
        <CardHeader>
          <CardTitle><p className="text-3xl">Tasks</p></CardTitle>
          <CardDescription>press ctrl + "." to add new task</CardDescription>
        </CardHeader>
        <CardContent>
            
        </CardContent>
      </Card>
    )
  }
  