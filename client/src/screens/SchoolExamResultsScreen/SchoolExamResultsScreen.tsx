import { useParams } from "react-router";
import { useResults } from "../../hooks/useResults";
import { useEffect } from "react";

export const SchoolExamResultsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { result, loading, fetchResultById } = useResults();

  useEffect(() => {
    fetchResultById(id);
  }, []);
  
  return (
    <div> 
      <h1>School Exam Results</h1>
    </div>
  );
};
