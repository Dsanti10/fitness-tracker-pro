import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

function ActivityDetails() {
  const { id } = useParams();
  console.log(id);
  const { data, loading, error } = useQuery("/activities/" + id, "activity");
  console.log(data);

  const { token } = useAuth();

  const {
    mutate: deleteActivity,
    loading: deletedLoading,
    error: deletedError,
  } = useMutation("DELETE", `/activities/${id}`, ["activity"]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  if (!data) return <p>No activity found.</p>;

  return (
    <li className="details">
      <h2>{data.name}</h2>
      <br />
      <p>Description: {data.description}</p>
      <br />
      <p>Exercise by: {data.creatorName}</p>
      <br />
      {token && (
        <button onClick={() => deleteActivity()}>
          {deletedLoading ? "Deleting" : deletedError ? deletedError : "Delete"}
        </button>
      )}
    </li>
  );
}

export default ActivityDetails;
