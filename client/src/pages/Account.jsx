import { useQuery } from '@apollo/client';
import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';


const AccountPage = () => {
    const { username } = Auth.getProfile().data;

    const { loading, error, data } = useQuery(QUERY_THOUGHTS, {
        variables: { username }
    });


    const thoughts = data?.thoughts || [];
  return (
      <div className="col-12 col-md-8 mb-3">
        <h1>My Thoughts</h1>
          {loading ? (
            <div>Loading... Please Wait</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
            />
          )}
        </div>
  );
};

export default AccountPage;
