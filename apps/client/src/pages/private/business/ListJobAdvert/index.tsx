import { trpc } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import * as moneyMask from '@/utils/moneyMask';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { useNavigate } from 'react-router-dom';

function ListJobAdvertComponent() {
  const { data: jobs, isLoading } = useQuery({
    queryFn: () => trpc.jobAdvert.listByBusiness.query({ page: 1, size: 10 }),
    queryKey: ['job-advert-business'],
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Carregando..</div>;

  return (
    <section className="space-y-2">
      {jobs?.map((job) => (
        <div
          className="rounded p-2 cursor-pointer"
          key={job._id}
          style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
          onClick={() => navigate(String(job._id))}
        >
          <div className="flex justify-between">
            <span>{job.title}</span>
            <span>{moneyMask.appy(job.remuneration || 0)}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[#828282]">{job.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export const ListJobAdvert = (
  <PrivateRoute role="business">
    <ListJobAdvertComponent />
  </PrivateRoute>
);
