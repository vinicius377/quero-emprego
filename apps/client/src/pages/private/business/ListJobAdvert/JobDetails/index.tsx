import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { trpc } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as moneyMask from '@/utils/moneyMask';

function JobDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryFn: () =>
      id
        ? Promise.all([
            trpc.jobAdvert.getById.query(id),
            trpc.jobApplication.listByJobAdvert.query(id),
          ])
        : [],
    queryKey: ['job-details'],
  });
  const [job, candidates] = data ?? [{}, []];
  console.log(data)

  useEffect(() => {
    if (!id) {
      navigate('/listar-empregos');
    }
  }, [id, navigate]);


  if (isLoading) return <div>Carregando...</div>

  return (
    <section>
      <div
        className="rounded p-2"
        style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
      >
        <div className="flex justify-between">
          <span>{job.title}</span>
          <span>{moneyMask.appy(job.remuneration || 0)}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-[#828282]">{job.description}</p>
        </div>
      </div>
      <section>
        {[].map(x => (
          <div key={x}>asd</div>
        ))}
      </section>
    </section>
  );
}

export const JobDetails = (
  <PrivateRoute role="business">
    <JobDetailsComponent />
  </PrivateRoute>
);
