'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  // Fetch tasks for the current user
  const tasks = useQuery(api.tasks.getMyTasks) || [];

  // Mutations
  const createTask = useMutation(api.tasks.createTask);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  // Add a sample task
  const handleAddTask = async () => {
    const randomNum = Math.floor(Math.random() * 100);
    await createTask({
      title: `Task ${randomNum}`,
      description: `This is task number ${randomNum}`,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      <div className="flex flex-col gap-4 mb-4">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 rounded-md shadow flex justify-between items-center ${
              task.completed ? 'bg-green-100' : 'bg-white'
            }`}
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-500">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask({ id: task._id })}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTask({ id: task._id })}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddTask}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Random Task
      </button>
    </div>
  );
}
