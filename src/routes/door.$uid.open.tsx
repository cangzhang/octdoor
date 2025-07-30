import { createFileRoute, HeadContent } from "@tanstack/react-router";

export const Route = createFileRoute('/door/$uid/open')({
  component: () => (
    <>
      <HeadContent />
      <OpenDoor />
    </>
  ),
  loader: async ({ params }) => {
    const response = await fetch(`/api/door/${params.uid}/open`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to open door');
    }

    return response.json();
  },
});

function OpenDoor() {
  const data = Route.useLoaderData({
    select: (data: { datas: { status: number; description: string; } }) => data.datas,
  });

  if (data) {
    return <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  }

  return (
    <div className="p-2">
      <h3>Opening Door...</h3>
      <p>Please wait...</p>
    </div>
  );
}
