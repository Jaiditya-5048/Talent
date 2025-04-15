import {ListItem} from './type'

export async function postData (task: ListItem) {
  try { 
      const response = await fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

    if(response.ok){console.log('ok')}
    else{console.log("cannot fetch data")}
  } catch (error) {
    console.log(error)
  }
}

export async function getData(): Promise<ListItem[] | void> {
  try {
    const response = await fetch('http://localhost:3000/task');

    if (response.ok) {
      const data: ListItem[] = await response.json();
      console.log('Fetched data:', data);
      return data;
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error while fetching data:', error);
  }
}

export async function deleteData(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Task with ID ${id} deleted successfully.`);
    } else {
      console.error('Failed to delete task:', response.status);
    }
  } catch (error) {
    console.error('Error while deleting task:', error);
  }
}

export async function updateData(task: ListItem) {
  try {
    const response = await fetch(`http://localhost:3000/task/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
  }
}
