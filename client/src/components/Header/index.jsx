import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-slate-900 text-white mb-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link className="text-lg text-sky-600" to="/">
            <h1 className="text-4xl font-bold">Ink & Insights</h1>
          </Link>
          <p className="text-2xl">Where a love for ink meets a passion for insight.</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl mr-4 pt-4">
            {Auth.loggedIn() && `Hey there, ${Auth.getProfile().data.username}!`}
          </p>
          {Auth.loggedIn() ? (
            <>
              <Link className="bg-sky-600 text-white px-6 py-3 rounded-lg no-underline hover:no-underline text-xl" to="/account">
                Account
              </Link>
              <button className="bg-sky-600 px-6 py-3 rounded-lg text-xl ml-4" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="bg-sky-600 text-white px-6 py-3 rounded-lg no-underline hover:no-underline text-xl" to="/login">
                Login
              </Link>
              <Link className="bg-sky-600 text-white px-6 py-3 rounded-lg no-underline hover:no-underline text-xl ml-4" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
