import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_THOUGHT } from "../../utils/queries";
import { EDIT_COMMENT, REMOVE_COMMENT } from "../../utils/mutations";

const CommentList = ({ comments = [], thoughtId }) => {
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [{ query: QUERY_SINGLE_THOUGHT, variables: { thoughtId } }],
  });

  const [editComment, { e }] = useMutation(EDIT_COMMENT, {
    refetchQueries: [{ query: QUERY_SINGLE_THOUGHT, variables: { thoughtId } }],
  });

  const handleRemoveComment = async (id) => {
    try {
      await removeComment({
        variables: {
          thoughtId: thoughtId,
          commentId: id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = async (id) => {
    let commentText = prompt("Please enter your new comment");
    if (commentText === null || commentText === "") {
      return;
    }
    try {
      await editComment({
        variables: {
          thoughtId: thoughtId,
          commentId: id,
          commentText,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3 className="text-3xl font-bold p-5 text-center">Insights</h3>
      <div className="grid gap-4 my-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-800 text-white p-3 rounded-lg">
            <h5 className="text-lg mb-1">
              {comment.commentAuthor} Shared{' '}
              <span className="text-sm">on {comment.createdAt}</span>
            </h5>
            <p className="mb-3">{comment.commentText}</p>
            <button
              className="bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline"
              onClick={() => handleEditComment(comment._id)}
            >
              Edit
            </button>
            <button
              className="bg-sky-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={() => handleRemoveComment(comment._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
