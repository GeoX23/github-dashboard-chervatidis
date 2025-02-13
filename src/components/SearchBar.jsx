import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Riple } from "react-loading-indicators";
import Suggestions from "./Suggestions";
import { useUser } from "../context/UserContext";

const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const { setUserData, error, setError } = useUser();

  const searchUsers = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=5`
      );
      setSuggestions(response.data.items);
      if (response.data.total_count === 0) {
        setError("User not found");
        setUserData(null);
      }
    } catch (err) {
      setError("Failed to fetch suggestions");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      setSuggestions([]); // Clear suggestions after selection
    } catch (err) {
      setError("User not found");
      setUserData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (username) {
      debounceTimeout.current = setTimeout(() => {
        searchUsers(username);
      }, 500);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [username]);

  return (
    <div className="flex flex-col items-center p-4 bg-base-100 grow sm:grow-0">
      <div className="w-full max-w-md space-y-4">
        <div className="relative flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            <label className="input input-bordered flex items-center gap-2 w-[80%] max-w-[600px] focus-within:w-[90%] bg-base-200 text-base-content">
              {loading ? (
                <Riple
                  color="currentColor"
                  size="small"
                  text=""
                  textColor=""
                  className="w-[20px] h-[20px]"
                />
              ) : (
                <svg
                  className="h-[1em] opacity-50 text-base-content"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
              )}

              <input
                type="search"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search GitHub username..."
                className="grow bg-transparent text-base-content placeholder:text-base-content/50"
              />
            </label>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <Suggestions
              suggestions={suggestions}
              fetchUserDetails={fetchUserDetails}
            />
          )}
        </div>

        {error && (
          <div className="alert alert-error text-error-content mt-[10px] shadow-lg rounded-lg animate-fadeIn max-w-[600px] mx-auto transition-all duration-300 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[24px] w-[24px]"
              fill="#ffffff"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
