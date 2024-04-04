import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="pt-10">
      <main className="flex justify-center items-center pt-10 pb-8 mb-4 bg-gray-900 max-w-2xl mx-auto lg:text-xl xl:text-2xl">
        <div className="w-full max-w-xl">
          <div className="bg-gray-800 shadow-md rounded-lg px-8 pt-10 pb-8 mb-4">
            <h4 className="text-3xl font-bold mb-4 text-sky-600">Login</h4>
            {data ? (
              <p className="text-green-500 mb-4">
                Success! You may now head{" "}
                <Link to="/" className="text-blue-500">
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                  <label
                    className="block text-gray-300 text-md font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                    id="email"
                    type="email"
                    placeholder="Your email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-300 text-md font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                    id="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
          {error && (
            <div className="text-red-500 text-center">{error.message}</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
