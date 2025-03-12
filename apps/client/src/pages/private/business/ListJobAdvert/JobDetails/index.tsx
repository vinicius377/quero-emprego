import { PrivateRoute } from '@/components/PrivateRoute';
import { useParams } from 'react-router-dom';

function JobDetailsComponent() {
  const { id } = useParams();
  return <section>{id}</section>;
}

export const JobDetails = PrivateRoute(<JobDetailsComponent />, "business")
