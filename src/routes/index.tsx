import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const input = useRef<HTMLInputElement>(null);

  const openDoor = async (uid: string) => {
    const response = await fetch(`/api/door/${uid}/open`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to open door');
    }

    await response.json();
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <h3>Welcome Home!</h3>
      <input type="text" placeholder="Door UID" ref={input} className="border p-1 w-40" />
      <button className="rounded p-1 border w-40" type='button' onClick={() => openDoor(input.current?.value || '')}>
        Open Door
      </button>
    </div>
  )
}
