import { useState } from "react";
import PropTypes from "prop-types";
import Repositories from "./Repositories";

const UserCard = ({ userData, onReposClick, onFollowersClick }) => {
  const [showRepos, setShowRepos] = useState(false);

  return (
    <>
      <div className="card bg-base-200 shadow-xl w-[100%] sm:w-[80%] max-w-[400px]">
        <div className="card-body items-center p-4 sm:p-8">
          <div className=" flex w-[100%] gap-[8px]">
            <div className="w-[62px] h-[62px] sm:w-24 sm:min-w-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <h2 className="card-title text-base-content text-lg sm:text-2xl mt-4">
                {userData.name}
              </h2>
              <p className="text-primary text-sm sm:text-base leading-none">
                @{userData.login}
              </p>
              {userData.location && (
                <p className="text-base-content/70 flex items-center gap-2 leading-none text-sm sm:text-base mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {userData.location}
                </p>
              )}
            </div>
          </div>

          {userData.bio && (
            <p className="text-base-content/70 text-sm sm:text-base mt-3 max-w-[90%]">
              {userData.bio}
            </p>
          )}
          <div className="stats bg-base-300 shadow flex flex-col sm:flex-row w-full mt-4 sm:mt-6">
            <button
              className="stat place-items-center p-2 sm:p-4 cursor-pointer hover:bg-blue-500 transition-colors duration-200"
              onClick={onFollowersClick}
            >
              <div className="stat-title text-base-content/70 text-xs sm:text-sm">
                Followers
              </div>
              <div className="stat-value text-base-content text-lg sm:text-2xl">
                {userData.followers}
              </div>
            </button>
            <div className="stat place-items-center p-2 sm:p-4 cursor-pointer hover:bg-blue-500 transition-colors duration-200">
              <div className="stat-title text-base-content/70 text-xs sm:text-sm">
                Following
              </div>
              <div className="stat-value text-base-content text-lg sm:text-2xl">
                {userData.following}
              </div>
            </div>
            <button
              className="stat place-items-center p-2 sm:p-4 cursor-pointer hover:bg-blue-500 transition-colors duration-200"
              onClick={onReposClick}
            >
              <div className="stat-title text-base-content/70 text-xs sm:text-sm">
                Repos
              </div>
              <div className="stat-value text-base-content text-lg sm:text-2xl">
                {userData.public_repos}
              </div>
            </button>
          </div>
        </div>
      </div>

      {showRepos && (
        <Repositories
          username={userData.login}
          onClose={() => setShowRepos(false)}
        />
      )}
    </>
  );
};

UserCard.propTypes = {
  userData: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
  }).isRequired,
  onReposClick: PropTypes.func.isRequired,
  onFollowersClick: PropTypes.func.isRequired,
};

export default UserCard;
