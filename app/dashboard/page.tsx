'use client';

import DashboardLayout from './DashboardLayout';
import TopBar from './TopBar';
import AddItemForm from './AddItemForm';
import ItemList from './ItemList';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function DashboardPage() {
  // Queries
  const items = useQuery(api.tasks.getMyTasks) ?? [];

  // Mutations
  const createItem = useMutation(api.tasks.createTask);
  const toggleItem = useMutation(api.tasks.toggleTask);
  const deleteItem = useMutation(api.tasks.deleteTask);

  return (
    <DashboardLayout>
      <TopBar />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <AddItemForm createItem={createItem} />

        <ItemList
          items={items}
          toggleItem={toggleItem}
          deleteItem={deleteItem}
        />
      </div>
    </DashboardLayout>
  );
}
