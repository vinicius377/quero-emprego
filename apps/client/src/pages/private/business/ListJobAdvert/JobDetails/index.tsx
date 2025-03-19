import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { trpc } from '@/lib/trpc';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as moneyMask from '@/utils/moneyMask';
import parse from 'html-react-parser';

function JobDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [
    { data: job, isLoading: jobLoading },
    { data: applications, isLoading: applicationLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['job-by-id'],
        queryFn: () => trpc.jobAdvert.getById.query(id as string),
        enabled: !!id,
      },
      {
        queryKey: ['list-application-by-job'],
        queryFn: () => trpc.jobApplication.listByJobAdvert.query(id as string),
        enabled: !!id,
      },
    ],
  });

  useEffect(() => {
    if (!id) {
      navigate('/listar-empregos');
    }
  }, [id, navigate]);

  if (jobLoading || applicationLoading || !job || !applications)
    return <div>Carregando...</div>;

  return (
    <section>
      <div
        className="rounded p-2 px-[2rem]"
        style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
      >
        <div className="flex justify-between">
          <span>{job.title}</span>
          <span>{moneyMask.appy(job.remuneration || 0)}</span>
        </div>
        <div className="flex justify-between max-h-60 overflow-auto">
          <p className="text-sm text-[#828282]">{parse(job.description)}</p>
        </div>
        <div>
          {job.}
        </div>
      </div>
      <section>
        {applications.map((x) => (
          <div key={x._id}>
            <div>
              <h2>{x.candidateId.name}</h2> <span>{x.candidateId.title}</span>
            </div>
            <p>{x.candidateId.description}</p>
          </div>
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
