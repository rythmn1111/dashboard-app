import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Calendar,
  BookCheck,
  BellPlus,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { useTaskContext } from "../../context/TaskContext" // Adjust path as needed

export default function Terminal() {
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null)
  const [taskName, setTaskName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const { addTask } = useTaskContext()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " " && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleCommandSelect = (command: string) => {
    setCommandOpen(false)
    setActiveDialog(command)
  }

  const handleCreateTask = async () => {
    if (!taskName.trim()) {
      setError('Task name cannot be empty')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await addTask(taskName)
      
      // Reset state and close dialog
      setTaskName('')
      setActiveDialog(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => handleCommandSelect('task')}>
              <BookCheck className="mr-2 h-4 w-4" />
              <span>Task</span>
            </CommandItem>
            
            <CommandItem onSelect={() => handleCommandSelect('reminder')}>
              <BellPlus className="mr-2 h-4 w-4" />
              <span>Reminder</span>
            </CommandItem>
            
            <CommandItem onSelect={() => handleCommandSelect('calendar')}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>

      {/* Task Dialog */}
      <Dialog open={activeDialog === 'task'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-name">Task name</Label>
              <Input 
                id="task-name" 
                placeholder="Enter task name" 
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreateTask} 
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reminder and Calendar Dialogs remain the same */}
    </>
  )
}