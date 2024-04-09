import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const AccountPage = () => {

  const { loading, error, data } = useQuery(QUERY_ME);

  const user = data?.me;


  return (
    <div className="flex justify-center items-center h-full">
      <div className="col-12 col-md-8 mb-3">
        <h1 className="text-center">My Insights</h1>
        {loading ? (
          <div>Loading... Please Wait</div>
        ) : (
          <ThoughtList
            thoughts={user.thoughts}
          />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
