import { trpc } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import * as moneyMask from '@/utils/moneyMask';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser"
import { Empty } from '@/components/shared/Empty';
import { Role } from '@packages/types/enums';

function ListJobAdvertComponent() {
  const { data: jobs, isLoading } = useQuery({
    queryFn: () => trpc.jobAdvert.listByBusiness.query({ page: 1, size: 10 }),
    queryKey: ['job-advert-business'],
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Carregando..</div>;

  return (
    <section className="space-y-2">
      {jobs?.length ? jobs?.map((job) => (
        <div
          className="rounded p-2 px-[2rem] cursor-pointer"
          key={job._id}
          style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
          onClick={() => navigate(String(job._id), { state: job })}
        >
          <div className="flex justify-between">
            <span>{job.title}</span>
            <span>{moneyMask.apply(job.remuneration || 0)}</span>
          </div>
          <div className="flex justify-between max-h-[10rem] overflow-hidden">
            <p className="text-sm text-[#828282]">{parse(job.description)}</p>
          </div>
        </div>
      )) : <Empty text='Não há vagas cadastradas.' />}
    </section>
  );
}

export const ListJobAdvert = (
  <PrivateRoute role={Role.business}>
    <ListJobAdvertComponent />
  </PrivateRoute>
);