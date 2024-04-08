import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div className="my-3">Loading... Please Wait</div>;
  }

  return (
    <div className="my-3">
      <h3 className="text-2xl font-bold bg-gray-800 text-white shadow-md rounded-lg p-4 m-0">
        {thought.thoughtAuthor} <br />
        <span className="text-sm text-gray-400">
          Created this Book Club on {thought.createdAt}
        </span>
        <blockquote className="p-4 text-lg">
          {thought.thoughtText}
        </blockquote>
      </h3>

      <div className="my-5">
        <CommentList comments={thought.comments} thoughtId={thought._id} />
      </div>
      <div className="m-3 p-4">
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
