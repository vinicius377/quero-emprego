import { Building2, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { twMerge } from 'tailwind-merge';

export function UserType() {
	return (
		<div className="flex justify-between max-w-[22rem] m-auto">
			<NavLink
				role="button"
				to="empresa"
				className={({ isActive }) =>
					isActive
						? twMerge('w-full h-full text-center active', styles.navActived)
						: 'w-full text-center'
				}
			>
				<div className="flex flex-col items-center py-1">
					<Building2 />
					Empresa
				</div>
			</NavLink>
			<NavLink
				role="button"
				to="candidato"
				className={({ isActive }) =>
					isActive
						? twMerge('w-full h-full text-center active', styles.navActived)
						: 'w-full text-center'
				}
			>
				<div className="flex flex-col items-center py-1">
					<User />
					Candidato
				</div>
			</NavLink>
		</div>
	);
}
