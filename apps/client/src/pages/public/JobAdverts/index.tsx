import { useQuery } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';

export function JobsAdverts() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['job-advert'],
    queryFn: () => trpc.jobAdvert.list.query(),
  });

  if (isLoading) return <div>Carregando</div>;

  const applyToJob = (id: string) => async () => {
    try {
      const appliedJob = await trpc.jobApplication.apply.mutate({
        jobAdvertId: id,
      });
    } catch (e) {}
  };

  return (
    <section>
      {jobs?.map((job) => (
        <div key={job.id} style={{ borderTop: 'solid 1px red' }}>
          <span>{job.title}</span>
          <span>{job.remuneration}</span>
          <p>{job.description}</p>
          <button type="button" onClick={applyToJob(job.id)}>Aplicar</button>
        </div>
      ))}
    </section>
  );
}
