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
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
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
  CommandShortcut,
} from "@/components/ui/command"

export default function Terminal() {
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null)

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
    setCommandOpen(false) // Close command menu
    setActiveDialog(command) // Open corresponding dialog
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
              <Input id="task-name" placeholder="Enter task name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Input id="task-description" placeholder="Enter task description" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setActiveDialog(null)}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={activeDialog === 'reminder'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogDescription>
              Create a new reminder with date and time.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reminder-title">Reminder title</Label>
              <Input id="reminder-title" placeholder="Enter reminder title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reminder-date">Date</Label>
              <Input id="reminder-date" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setActiveDialog(null)}>Set Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={activeDialog === 'calendar'} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calendar Event</DialogTitle>
            <DialogDescription>
              Schedule a new calendar event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-title">Event title</Label>
              <Input id="event-title" placeholder="Enter event title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="datetime-local" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setActiveDialog(null)}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}