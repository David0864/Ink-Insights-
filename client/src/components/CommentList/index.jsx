import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_THOUGHT } from "../../utils/queries";
import { EDIT_COMMENT, REMOVE_COMMENT } from "../../utils/mutations";

const CommentList = ({ comments = [] , thoughtId}) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  const [removeComment, { error }] = useMutation
  (REMOVE_COMMENT, {
    refetchQueries: [
      QUERY_SINGLE_THOUGHT,
      'getSingleThought'
    ]
  });
  const [editComment, { e }] = useMutation
  (EDIT_COMMENT, {
    refetchQueries: [
      QUERY_SINGLE_THOUGHT,
      'getSingleThought'
    ]
  });

  const HandleRemoveComment = async (id) => {
  
    try {
      const { data } = await removeComment({
        variables: {
          thoughtId: thoughtId,
          commentId: id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  const HandleEditComment = async (id) => {
      
      let commentText = prompt("Please enter your new comment");
            if (commentText === null || commentText === "") {
              return;
            }      
        try {
  
          const { data } = await editComment({
            variables: {
              thoughtId: thoughtId,
              commentId: id,
              commentText
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              <button className="btn btn-primary btn-block btn-squared" onClick={()=> HandleEditComment(comment._id)}>Edit</button>
              <button className="btn btn-danger btn-block btn-squared" onClick={()=> HandleRemoveComment(comment._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
