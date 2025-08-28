import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { HydrationBoundary } from '@tanstack/react-query';
import NotesClient from '@/app/notes/Notes.client';

export default async function TasksPage() {
  const queryClient = new QueryClient();
  const search = '';
  const page = 1;
  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
