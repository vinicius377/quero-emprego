import { useQuery } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as moneyMask from '@/utils/moneyMask';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';
import { useAtomValue } from 'jotai';
import { Image } from 'lucide-react';
import styles from './styles.module.css';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { Empty } from '@/components/shared/Empty';

export function JobsAdverts() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['job-advert'],
    queryFn: () => trpc.jobAdvert.list.query({ page: 1, size: 10 }),
  });
  const [opened, setOpened] = useState('');
  const navigate = useNavigate();
  const user = useAtomValue(userService.user);

  if (isLoading) return <div>Carregando</div>;

  const applyToJob = (id: string) => async () => {
    try {
      const appliedJob = await trpc.jobApplication.apply.mutate({
        jobAdvertId: id,
      });
    } catch (e) {
      if (e.message === 'Token invalido') {
        navigate('/login/candidato');
      }
      toast.error(e.message);
    }
  };

  const onOpenedDescripton = (jobId: string) => () => {
    const job = jobId === opened ? '' : jobId;
    setOpened(job);
  };

  return (
    <section className="space-y-2">
      {!!jobs.length ? (
        jobs?.map((job) => (
          <div
            className="rounded p-2 min-h-[8rem]"
            key={job._id}
            style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
            onClick={onOpenedDescripton(job._id)}
          >
            <div className="flex gap-2">
              <div>
                <Image size={60} color="#c4c4c4" />
                <h3 className="text-center">{job.business.businessName}</h3>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h3>{job.title}</h3>
                  <span>{moneyMask.appy(job.remuneration || 0)}</span>
                </div>
                <p
                  className={twMerge(
                    'text-sm text-[#828282] cursor-pointer',
                    opened === job._id ? '' : styles.description,
                  )}
                >
                  {job.description}
                </p>
                {user?.role === 'candidate' && (
                  <Button
                    disabled={job.applied}
                    type="button"
                    onClick={applyToJob(job._id)}
                    className="ml-auto cursor-pointer"
                  >
                    Aplicar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty text="Não há vagas." />
      )}
    </section>
  );
}
