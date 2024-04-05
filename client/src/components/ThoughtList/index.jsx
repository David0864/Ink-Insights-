import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { QUERY_THOUGHTS } from '../../utils/queries';
import { EDIT_THOUGHT, REMOVE_THOUGHT } from '../../utils/mutations';

const ThoughtList = ({ thoughts, title }) => {
  const [removeThought, { error }] = useMutation(REMOVE_THOUGHT, {
    refetchQueries: [{ query: QUERY_THOUGHTS }],
  });

  const [editThought] = useMutation(EDIT_THOUGHT, {
    refetchQueries: [{ query: QUERY_THOUGHTS }],
  });

  const handleRemoveThought = async (id) => {
    try {
      await removeThought({
        variables: {
          thoughtId: id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditThought = async (id) => {
    let thoughtText = prompt('Please enter your new thought');
    if (thoughtText === null || thoughtText === '') {
      return;
    }
    try {
      await editThought({
        variables: {
          thoughtId: id,
          thoughtText,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-4 text-sky-600">{title}</h3>
      {thoughts.map((thought) => (
        <div key={thought._id} className="bg-gray-800 shadow-md rounded-lg mb-4">
          <div className="p-4">
            <h4 className="text-xl font-bold text-white">
              {thought.thoughtAuthor} <br />
              <span className="text-sm text-gray-400">
                Created this Book Club Blog Post {thought.createdAt}
              </span>
            </h4>
            <div className="text-white mt-4">
              <p>{thought.thoughtText}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center p-4">
            <Link
              className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 lg:mb-0 lg:mr-2 focus:outline-none focus:shadow-outline no-underline hover:no-underline"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this book.
            </Link>
            <button
              className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 lg:mb-0 lg:mr-2 focus:outline-none focus:shadow-outline"
              onClick={() => handleEditThought(thought._id)}
            >
              Edit
            </button>
            <button
              className="bg-sky-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-2 lg:mb-0 focus:outline-none focus:shadow-outline"
              onClick={() => handleRemoveThought(thought._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;
