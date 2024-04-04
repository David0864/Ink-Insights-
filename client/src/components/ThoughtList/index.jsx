import { Link } from 'react-router-dom';
import { EDIT_THOUGHT, REMOVE_THOUGHT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_THOUGHTS } from '../../utils/queries';

const ThoughtList = ({ thoughts, title }) => {

  
  if (!thoughts.length) {
    return <h3>No Insights Yet</h3>;
  }
  const [removeThought, { error }] = useMutation
  (REMOVE_THOUGHT,{
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts'
    ]
  });
  const [editThought, { e }] = useMutation
  (EDIT_THOUGHT ,{
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts'
    ]
  });

  const HandleRemoveThought = async (id) => {
  
    try {
      const { data } = await removeThought({
        variables: {
          thoughtId: id,
        },
      });

 
    } catch (err) {
      console.error(err);
    }
    }
    const HandleEditThought = async (id) => {

      let thoughtText = prompt("Please enter your new thought");
            if (thoughtText === null || thoughtText === "") {
              return;
            }      
        try {

          const { data } = await editThought({
            variables: {
              thoughtId: id,
              thoughtText
            },
          });
    
    
        } catch (err) {
          console.error(err);
        }
        }                   
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {thought.thoughtAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this thought on {thought.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
          <button className="btn btn-primary btn-block btn-squared" onClick={()=> HandleEditThought(thought._id) }>Edit</button>
          <button className="btn btn-danger btn-block btn-squared" onClick={()=> HandleRemoveThought(thought._id)}>Delete</button>
          </div>
       
        ))}
    </div>
  );
};

export default ThoughtList;
