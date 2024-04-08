import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 shadow-md rounded-lg p-8">
      <h3 className="text-3xl font-bold mb-4 text-sky-600">What is your insight on this book?</h3>

      {Auth.loggedIn() ? (
        <>
          <p className={`text-sm mb-2 text-gray-400 ${characterCount === 280 || error ? 'text-red-500' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
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
  );
};

export default CommentForm;
