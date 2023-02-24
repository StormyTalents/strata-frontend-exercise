import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { ErrorMsg, FavoriteButton, SpinnerBox } from "../../components";

import { UserContext } from "../../context";

import useAsync from "../../hook/use-async";

import { REFRESH_TIME } from "../../config";

import { IUserDetails } from "../../type";

const Leaderboard: FC = () => {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const { loading, error, data, runApi } = useAsync();

  useEffect(() => {
    runApi("/api/leaderboard");
    const intervalId = setInterval(() => {
      runApi("/api/leaderboard");
    }, REFRESH_TIME);
    return () => intervalId && clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data) {
      const sortedUserData: IUserDetails[] = data.leaderboard.sort(
        (a: IUserDetails, b: IUserDetails) => b.score - a.score
      );
      const storedData: IUserDetails[] = sortedUserData.map((newData) => {
        newData.liked = userData.find(
          (item) => item.username === newData.username
        )?.liked;
        return newData;
      });
      setUserData(storedData);
    }
  }, [data]);

  return (
    <>
      <div className="px-10">
        <div className="flex justify-center">
          <div className="bg-grey-800 rounded-xl w-[320px] max-h-[540px] h-[540px] overflow-auto mb-8">
            <p className="text-sm font-bold text-grey-200 px-3 pt-[18px] pb-[2px]">
              User Rank
            </p>
            {!error &&
              userData?.map((item, idx) => (
                <div
                  key={idx + item.username}
                  className="px-3 py-[10px] last:rounded-b-xl last:border-transparent border-b border-grey-700 flex items-center justify-between active:bg-grey-600"
                  onClick={() => {
                    router.push(`/profile/${item.username}`);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md">
                      <img
                        src={item.profileImage}
                        width="40px"
                        height="40px"
                        alt="profile"
                      />
                    </div>
                    <div className="py-[2px]">
                      <p className="text-base font-bold text-grey-50">
                        {item.username}
                      </p>
                      <p className="text-xs font-bold text-grey-400">
                        {item.score}
                      </p>
                    </div>
                  </div>
                  <FavoriteButton mode={item.liked || false} />
                </div>
              ))}
            {!error && !loading && !userData.length && <SpinnerBox />}
            {error && (
              <ErrorMsg text="Make sure your device has an active Internet connection" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
