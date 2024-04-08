import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="pt-10">
      <div className="max-w-lg mx-auto bg-gray-800 shadow-md rounded-lg p-8">
        <h3 className="text-3xl font-bold mb-4 text-sky-500">Create New Book Club Blog</h3>

        {Auth.loggedIn() ? (
          <>
            <p className={`text-sm mb-2 text-gray-400 ${characterCount === 280 || error ? 'text-red-500' : ''}`}>
              Character Count: {characterCount}/280
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <textarea
                name="thoughtText"
                placeholder="Add your book title or blog post name"
                value={thoughtText}
                onChange={handleChange}
                className="w-full p-2 border rounded-md resize-none bg-gray-700 text-white"
                style={{ minHeight: '150px' }}
              ></textarea>
              <button
                className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Add Insight
              </button>
              {error && (
                <div className="bg-red-500 text-white p-2 rounded-md">{error.message}</div>
              )}
            </form>
          </>
        ) : (
          <p className="text-lg text-white">
            You need to be logged in to share your insights. Please{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              login
            </Link>{' '}
            or{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              signup
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default ThoughtForm;
