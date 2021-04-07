import React, { useState, useEffect } from "react";
import style from "./leaderboard.module.css";
import LeaderboardTable from "../components/LeaderboardTable";
import LeaderboardDiamondToIron from "../components/LeaderboardDiamondToIron";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

function Leaderboard({
  version,
  showNav,
  changeLeaderBoard,
  leaderboard,
  postsPerPage,
  totalPosts,
  totalPosts2,
  paginate,
  currentPage,
  region,
  getPlayerName,
  changeLeaderBoardPage,
  leaderboardDiamondToIron,
  postsperPageDiamondToIron,
  fullLeaderboard,
  setPagetoOne,
  leaderboardDone,
  setLeaderboardDone,
}) {
  const [rank, setRank] = useState("CHALLENGER");
  const [division, setDivision] = useState("I");
  const [mapDivision, setMapDivision] = useState(["I", "II", "III", "IV"]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showNav();
    let timer;
    timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (mounted) {
      if (
        rank === "CHALLENGER" ||
        rank === "GRANDMASTER" ||
        rank === "MASTER"
      ) {
        setMapDivision(["I"]);
        changeLeaderBoard(rank, region);
      } else {
        setMapDivision(["I", "II", "III", "IV"]);
        changeLeaderBoardPage(rank, division, page);
      }
    }
    let skeleTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(skeleTimer);
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank, division, page, region]);

  const nextPage = () => {
    if (fullLeaderboard.length < 205) {
      return;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <LeaderboardSkeleton loading={loading} />
      <div
        style={!loading ? { display: "block" } : { display: "none" }}
        className={style.leaderboardContainer}
      >
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <select
            onChange={(e) => {
              setRank(e.target.value);
              setPage(1);
            }}
          >
            <option defaultValue value="CHALLENGER">
              Challenger
            </option>
            <option value="GRANDMASTER">GRANDMASTER</option>
            <option value="MASTER">MASTER</option>
            <option value="DIAMOND">DIAMOND</option>
            <option value="PLATINUM">PLATINUM</option>
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
            <option value="BRONZE">BRONZE</option>
            <option value="IRON">IRON</option>
          </select>
          <select
            onChange={(e) => {
              setDivision(e.target.value);
              setPage(1);
              setPagetoOne();
            }}
          >
            {mapDivision.map((div, i) => (
              <option key={i} defaultValue={div === "I"} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
        {rank === "CHALLENGER" ||
        rank === "GRANDMASTER" ||
        rank === "MASTER" ? (
          <LeaderboardTable
            version={version}
            leaderboard={leaderboard}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
            rank={rank}
            region={region}
            getPlayerName={getPlayerName}
            leaderboardDone={leaderboardDone}
            setLeaderboardDone={setLeaderboardDone}
          />
        ) : (
          <LeaderboardDiamondToIron
            version={version}
            leaderboard={leaderboardDiamondToIron}
            postsPerPage={postsperPageDiamondToIron}
            totalPosts={totalPosts2}
            paginate={paginate}
            currentPage={currentPage}
            rank={rank}
            region={region}
            getPlayerName={getPlayerName}
            page={page}
            nextPage={nextPage}
            prevPage={() => {
              setPage((prev) => prev - 1);
            }}
            fullLeaderboard={fullLeaderboard}
          />
        )}
      </div>
    </>
  );
}

export default Leaderboard;
