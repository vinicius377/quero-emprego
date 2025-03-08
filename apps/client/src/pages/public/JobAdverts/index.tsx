import { useQuery } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';
import type { RouterOutput } from "@packages/trpc"

export function JobsAdverts() {
  const { data, isLoading } = useQuery({
    queryKey: ['job-advert'],
    queryFn: () => trpc.jobAdvert.list.query(),
  });

  if (isLoading) return <div>Carregando</div>

  return <section>
    {data?.map(x => (
      <div>
        {x}
      </div>
    ))}
  </section>;
}
