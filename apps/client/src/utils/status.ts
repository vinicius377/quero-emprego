import { StatusJob } from '@packages/types/enums';

interface StatusUtilsI {
  label: string;
  color: string;
  value: StatusJob;
}

export const StatusJobUtils: Record<StatusJob, StatusUtilsI> = {
  [StatusJob.canceled]: {
    color: 'red',
    label: 'Cancelado',
    value: StatusJob.canceled,
  },
  [StatusJob.close]: {
    label: 'Fechado',
    color: 'gray',
    value: StatusJob.close,
  },
  [StatusJob.done]: {
    label: 'Terminado',
    color: 'green',
    value: StatusJob.done,
  },
  [StatusJob.opened]: {
    label: 'Aberto',
    color: 'yellow',
    value: StatusJob.opened,
  },
};
