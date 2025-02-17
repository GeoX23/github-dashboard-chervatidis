import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Followers = ({ username, onClose, followersNumber }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const followersPerPage = 30;

  useEffect(() => {
    let totalPages = Math.ceil(followersNumber / 30);
    const fetchFollowers = async () => {
      try {
        for (let i = 1; i <= totalPages; i++) {
          const response = await axios.get(
            `https://api.github.com/users/${username}/followers?per_page=100`
          );
          setFollowers(() => [...response.data]);
        }
      } catch (err) {
        setError(
          err.response?.status === 403
            ? "API rate limit exceeded. Please try again later."
            : "Failed to fetch followers"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  const indexOfLastFollower = currentPage * followersPerPage;
  const indexOfFirstFollower = indexOfLastFollower - followersPerPage;
  const currentFollowers = followers.slice(
    indexOfFirstFollower,
    indexOfLastFollower
  );
  const totalPages = Math.ceil(followers.length / followersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  if (error)
    return <div className="alert alert-error text-error-content">{error}</div>;

  return (
    <div className="card bg-base-200 shadow-xl w-[100%] sm:w-[80%] max-w-[800px] mt-4">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Followers</h2>
            <p className="text-base-content/70">
              Total followers: {followers.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost text-base-content hover:bg-base-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {currentFollowers.map((follower) => (
            <div
              key={follower.id}
              className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body py-4">
                <div className="flex items-center gap-[10px]">
                  <div className="avatar">
                    <div className="w-[72px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={follower.avatar_url} alt={follower.login} />
                    </div>
                  </div>
                  <div>
                    <h3 className="card-title text-base-content text-lg">
                      <a
                        href={follower.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-hover text-primary"
                      >
                        {follower.login}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`btn btn-circle ${
                  currentPage === i + 1
                    ? "btn-primary text-primary-content"
                    : "btn-ghost text-base-content hover:bg-base-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Followers.propTypes = {
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  followersNumber: PropTypes.number.isRequired,
};

export default Followers;
