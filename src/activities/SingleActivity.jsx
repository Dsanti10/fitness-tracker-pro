import { useParams } from "react-router";
import { useState } from "react";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

const SingleActivity = () => {
  //   const activity = useState();

  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  /** Shows a single activity. Logged-in users will also see a delete button. */
  function ActivityListItem({ activity }) {
    const { token } = useAuth();
    const {
      mutate: deleteActivity,
      loading,
      error,
    } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

    return (
      <li>
        <p>{activity.name}</p>
        <p>{activity.description}</p>
        <p>{activity.creatorId}</p>
        {token && (
          <button onClick={() => deleteActivity()}>
            {loading ? "Deleting" : error ? error : "Delete"}
          </button>
        )}
      </li>
    );
  }
};

export default SingleActivity;
