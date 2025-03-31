import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { trpc } from '@/lib/trpc';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as moneyMask from '@/utils/moneyMask';
import parse from 'html-react-parser';
import { Role, StatusJob } from '@packages/types/enums';
import { StatusJobUtils } from '@/utils/status';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleHead } from '@/components/shared/TitleHead';
import styles from './style.module.css';
import { twMerge } from 'tailwind-merge';
import { Empty } from '@/components/shared/Empty';
import { Loading } from '@/components/layout/Loading';

function JobDetailsComponent() {
	const { id } = useParams();
	const navigate = useNavigate();
  const location = useLocation()
	const [
		{ data: job, isLoading: jobLoading },
		{ data: applications, isLoading: applicationLoading },
	] = useQueries({
		queries: [
			{
				queryKey: ['job-by-id'],
				queryFn: () => trpc.jobAdvert.getById.query(id as string),
				enabled: !!id && !location.state,
        initialData: location.state
			},
			{
				queryKey: ['list-application-by-job'],
				queryFn: () => trpc.jobApplication.listByJobAdvert.query(id as string),
				enabled: !!id,
			},
		],
	});
	const currentStatus = StatusJobUtils[job?.status ?? StatusJob.opened];

	useEffect(() => {
		if (!id) {
			navigate('/listar-empregos');
		}
	}, [id, navigate]);

	if (jobLoading || applicationLoading || !job || !applications)
		return <Loading />

	return (
		<section>
			<TitleHead
				title={job?.title || ""}
				onBack={() => navigate('/listar-empregos')}
			/>
			<div
				className="rounded bg-white p-2 px-[2rem]"
				style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
			>
				<div className="flex justify-between">
					<span>{job.title}</span>
					<span>{moneyMask.apply(job.remuneration || 0)}</span>
				</div>
				<div className="flex justify-between max-h-60 overflow-auto">
					<p className="text-sm text-[#828282]">{parse(job.description)}</p>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-2 items-center">
						<div
							className="w-4 h-4 rounded-[50%]"
							style={{ background: currentStatus.color }}
						/>
						<span>{currentStatus.label}</span>
					</div>
					<Button onClick={() => navigate('editar')}>
						<div className="flex gap-2">
							Editar
							<PencilLine />
						</div>
					</Button>
				</div>
			</div>
			<section className="space-y-2 mt-6">
				<h1 className="font-semibold text-lg">Candidatos</h1>
				{applications.length ? applications.map((x) => (
					<div
						key={x._id}
						className="rounded bg-white p-2 px-[1rem] md:px-[2rem]"
						style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
            onClick={() => navigate(`candidato/${x.__v}`, { state: x.candidateId })}
					>
						<div className="flex gap-2">
							<h2>{x.candidateId.name}</h2>{' '}
							<span className="text-zinc-500">({x.candidateId.title})</span>
						</div>
						<p
							className={twMerge(
								'text-md ml-2 text-gray-700 mt-1',
								styles.description,
							)}
						>
							{x.candidateId.description}
						</p>
					</div>
				)) : <Empty text="Ninguém aplicou a vaga ainda."/>}
			</section>
		</section>
	);
}

export const JobDetails = (
	<PrivateRoute role={Role.business}>
		<JobDetailsComponent />
	</PrivateRoute>
);
