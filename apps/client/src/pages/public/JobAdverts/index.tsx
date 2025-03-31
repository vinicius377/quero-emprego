import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';
import * as moneyMask from '@/utils/moneyMask';
import { userService } from '@/services/user.service';
import { useAtomValue } from 'jotai';
import { Image, Search } from 'lucide-react';
import styles from './styles.module.css';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { Empty } from '@/components/shared/Empty';
import parse from 'html-react-parser';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/Debounce';
import { format } from 'date-fns';
import { ButtonApplication } from './components/ButtonApplication';

export function JobsAdverts() {
	const [search, setSearch] = useState('');
	const {
		data: jobs,
    refetch
	} = useSuspenseQuery({
		queryKey: ['job-advert-list'],
		queryFn: () =>
			trpc.jobAdvert.list.query({ page: 1, size: 10, term: search }),
	});
	const [opened, setOpened] = useState('');
	const user = useAtomValue(userService.user);
	const searchHandler = useDebounce(() => refetch(), 500);

	useEffect(() => {
		searchHandler(search);
	}, [search]);

	const onOpenedDescripton = (jobId: string) => () => {
		const job = jobId === opened ? '' : jobId;
		setOpened(job);
	};

	return (
		<section className="space-y-2">
			<Input
				placeholder="O que você procura?"
				icons={{
					Left: <Search color="#c4c4c4" />,
				}}
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value)}
			/>
			{jobs.length ? (
				jobs?.map((job) => (
					<div
						className="rounded bg-white p-2 min-h-[8rem]"
						key={job._id}
						style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
					>
						<div className="flex gap-2">
							<div className="flex flex-col items-center">
								<Image size={60} color="#c4c4c4" />
								<h3 className="text-center">{job.businessId?.businessName}</h3>
								{job.createdAt && (
									<span className="italic font-light text-xs text-center">
										{format(job.createdAt, "dd/MM/yyyy ' ás ' HH:mm")}
									</span>
								)}
							</div>
							<div className="w-full">
								<div className="flex justify-between">
									<h3>{job.title}</h3>
									<span>{moneyMask.apply(job.remuneration || 0)}</span>
								</div>
								<div
									onClick={onOpenedDescripton(job._id)}
									className=" cursor-pointer"
								>
									<p
										className={twMerge(
											'text-sm text-[#828282] overflow-auto max-h-[20rem]',
											opened === job._id ? '' : styles.description,
										)}
									>
										{parse(job.description)}
									</p>
									<span className="text-sm text-zinc-400">
										{opened === job._id ? 'Ler menos' : 'Ler mais'}
									</span>
								</div>
								<ButtonApplication
									user={user}
									job={job}
                  onDone={refetch}
								/>
							</div>
						</div>
					</div>
				))
			) : (
				<Empty
					text={
						search.length ? `Não há vagas para '${search}'.` : 'Não há vagas.'
					}
				/>
			)}
		</section>
	);
}
