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

export default function Task_Tab({ className }: Task_TabProps) {
    return (
      
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle><p className="text-3xl">Tasks</p></CardTitle>
          
        </CardHeader>
        <CardContent>
            {/*do not add anything here  */}
        </CardContent>
      </Card>
    )
  }
  