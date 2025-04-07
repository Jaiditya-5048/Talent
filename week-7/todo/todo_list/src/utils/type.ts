export type ListItem = {
  id: string;
  description: string;
  isCompleted: boolean;
};

export interface AddProps {
  onTaskAdded: () => void;
  editingTask: ListItem | null;
  setEditingTask: React.Dispatch<React.SetStateAction<ListItem | null>>;
}