import PropTypes from "prop-types";

const Suggestions = ({ suggestions, fetchUserDetails }) => {
  return (
    <div className="absolute mt-[40px] w-[100%] sm:w-[80%] max-w-[600px] card bg-base-200 shadow-xl z-10">
      {suggestions.map((user) => (
        <div
          key={user.id}
          onClick={() => fetchUserDetails(user.login)}
          className="flex items-center gap-[8px] p-[8px] hover:bg-base-300 cursor-pointer transition-colors duration-200"
        >
          <div className="">
            <div className="w-8 rounded-full">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
          </div>
          <span className="text-base-content">{user.login}</span>
        </div>
      ))}
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
};

export default Suggestions;
