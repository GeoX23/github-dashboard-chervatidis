import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Repositories = ({ username, onClose }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 30;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        setRepos(response.data);
      } catch (err) {
        setError("Failed to fetch repositories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const sortedRepos = [...repos].sort((a, b) => {
    return sortOrder === "desc"
      ? b.stargazers_count - a.stargazers_count
      : a.stargazers_count - b.stargazers_count;
  });

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = sortedRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);

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
          <h2 className="text-2xl font-bold text-base-content">
            Public Repositories
          </h2>
          <div className="flex gap-4">
            <select
              className="select select-bordered bg-base-200 text-base-content"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Most Stars</option>
              <option value="asc">Least Stars</option>
            </select>
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost text-base-content hover:bg-base-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {currentRepos.map((repo) => (
            <div
              key={repo.id}
              className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body py-4">
                <h3 className="card-title text-base-content text-lg">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover text-primary"
                  >
                    {repo.name}
                  </a>
                  <div className="badge badge-primary text-primary-content">
                    ★ {repo.stargazers_count}
                  </div>
                </h3>
                <p className="text-base-content/70 text-sm">
                  {repo.description || "No description available"}
                </p>
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

Repositories.propTypes = {
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Repositories;
