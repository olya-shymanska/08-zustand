import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>
};

const NotesPage = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', tag],
        queryFn: () => fetchNotes({ query: '', page: 1, ...(tag !== 'All' ? { tag } : {}) })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    )
}

export default NotesPage