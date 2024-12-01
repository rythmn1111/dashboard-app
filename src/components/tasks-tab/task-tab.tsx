import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash2, CheckSquare, Square } from "lucide-react"
import { useTaskContext } from "../../context/TaskContext" // Adjust path as needed

interface Task_TabProps {
  className?: string;
}

export default function Task_Tab({ className }: Task_TabProps) {
  const { tasks, loading, error, deleteTask, updateTaskCompletion } = useTaskContext();

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle><p className="text-3xl">Tasks</p></CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center space-x-2 justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => updateTaskCompletion(task)}
                  >
                    {task['task-complition'] ? (
                      <CheckSquare className="text-green-500" />
                    ) : (
                      <Square className="text-gray-500" />
                    )}
                  </Button>
                  <span 
                    className={
                      task['task-complition'] 
                        ? 'line-through text-gray-500' 
                        : ''
                    }
                  >
                    {task["task-name"]}
                  </span>
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}