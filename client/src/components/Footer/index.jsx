import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="w-full mt-auto bg-secondary p-4">
      <div className="container mx-auto text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md mb-3 hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            &larr; Return To Blog Post List
          </button>
        )}
        <h4 className="text-white">
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Ink & Insights.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
