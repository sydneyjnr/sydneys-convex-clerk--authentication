'use client';

export default function ItemList({
  items,
  toggleItem,
  deleteItem,
}: any) {
  return (
    <ul className="space-y-2">
      {items.map((item: any) => (
        <li
          key={item._id}
          className="flex justify-between border p-3 rounded"
        >
          <div>
            <p className={item.completed ? 'line-through' : ''}>
              {item.title}
            </p>
            <small>{item.description}</small>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleItem({ id: item._id })}
              className="text-sm"
            >
              ✅
            </button>
            <button
              onClick={() => deleteItem({ id: item._id })}
              className="text-sm text-red-600"
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
