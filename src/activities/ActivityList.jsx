import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import SingleActivity from "./ActivityDetails";
import useMutation from "../api/useMutation";
import { NavLink } from "react-router";

export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  console.log(activities);
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  return (
    <li>
      <NavLink to={`/activities/${activity.id}`}>
        <p>{activity.name}</p>
      </NavLink>
    </li>
  );
}
