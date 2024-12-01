import React, { 
    createContext, 
    useState, 
    useContext, 
    ReactNode, 
    useEffect 
  } from 'react';
  import { supabase } from "../../utils/supabase";
  // Define the Tables type
  type Tables<T extends string> = {
    id: number;
    'task-name': string;
    'task-complition': boolean;
    created_at: string;
  };

  // Create the context type
  type TaskContextType = {
    tasks: Tables<'tasks'>[];
    addTask: (taskName: string) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
    updateTaskCompletion: (task: Tables<'tasks'>) => Promise<void>;
    loading: boolean;
    error: string | null;
  };
  
  // Create the context
  const TaskContext = createContext<TaskContextType | undefined>(undefined);
  
  // Provider component
  export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Tables<'tasks'>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch tasks
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data: fetchedTasks, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (error) throw error;
  
        setTasks(
          (fetchedTasks || []).map(task => ({
            ...task,
            'task-name': task['task-name'] || '',
            'task-complition': task['task-complition'] || false,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    // Add a new task
    const addTask = async (taskName: string) => {
      try {
        const { error } = await supabase
          .from('tasks')
          .insert({
            'task-name': taskName,
            'task-complition': false,
            created_at: new Date().toISOString()
          });
  
        if (error) throw error;
  
        // Refetch tasks to ensure latest data
        await fetchTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while adding task');
        throw err;
      }
    };
  
    // Delete a task
    const deleteTask = async (taskId: number) => {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId);
  
        if (error) throw error;
  
        // Refetch tasks to ensure latest data
        await fetchTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while deleting task');
        throw err;
      }
    };
  
    // Update task completion status
    const updateTaskCompletion = async (task: Tables<'tasks'>) => {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ 
            'task-complition': !task['task-complition'] 
          })
          .eq('id', task.id);
  
        if (error) throw error;
  
        // Refetch tasks to ensure latest data
        await fetchTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while updating task');
        throw err;
      }
    };
  
    // Initial fetch and setup real-time subscription
    useEffect(() => {
      // Fetch initial tasks
      fetchTasks();
  
      // Set up real-time subscription
      const subscription = supabase
        .channel('tasks')
        .on(
          'postgres_changes', 
          { event: '*', schema: 'public', table: 'tasks' },
          () => {
            fetchTasks();
          }
        )
        .subscribe();
  
      // Cleanup subscription
      return () => {
        supabase.removeChannel(subscription);
      };
    }, []);
  
    return (
      <TaskContext.Provider 
        value={{ 
          tasks, 
          addTask, 
          deleteTask, 
          updateTaskCompletion, 
          loading, 
          error 
        }}
      >
        {children}
      </TaskContext.Provider>
    );
  };
  
  // Custom hook to use the TaskContext
  export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
  };