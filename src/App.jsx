import "./App.css";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { UserProvider, useUser } from "./context/UserContext";
import UserCard from "./components/UserCard";
import Repositories from "./components/Repositories";
import Followers from "./components/Followers";
import BackToTop from "./components/BackToTop";
import { useState } from "react";

const AppContent = () => {
  const { userData } = useUser();
  const [showRepos, setShowRepos] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const handleReposClick = () => {
    setShowFollowers(false); // Close followers if open
    setShowRepos(true);
  };

  const handleFollowersClick = () => {
    setShowRepos(false); // Close repos if open
    setShowFollowers(true);
  };

  return (
    <div className="min-h-screen bg-base-100 pt-[10px]">
      <div className="flex justify-between p-[10px]">
        <SearchBar />
        <ThemeToggle />
      </div>
      {userData && (
        <div className="flex flex-wrap items-start gap-4">
          <UserCard
            userData={userData}
            onReposClick={handleReposClick}
            onFollowersClick={handleFollowersClick}
          />
          {showRepos && (
            <Repositories
              username={userData.login}
              onClose={() => setShowRepos(false)}
            />
          )}
          {showFollowers && (
            <Followers
              username={userData.login}
              onClose={() => setShowFollowers(false)}
              followersNumber={userData.followers}
            />
          )}
        </div>
      )}
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
