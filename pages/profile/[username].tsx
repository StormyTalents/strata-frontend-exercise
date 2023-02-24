import { FC, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { FavoriteButton, SpinnerBox } from "../../components";

import { UserContext } from "../../context";

import useAsync from "../../hook/use-async";

import { IProfileData } from "../../type";

const User: FC = () => {
  const route = useRouter();
  const { username } = route.query;
  const { loading, data, runApi } = useAsync();
  const [detail, setDetail] = useState<IProfileData>();
  const { userData, setUserData, getCurrentUser } = useContext(UserContext);
  const currentUser = getCurrentUser(username as string);

  useEffect(() => {
    runApi(`/api/profile/${username}`);
  }, []);

  useEffect(() => {
    setDetail(data);
  }, [data]);

  return (
    <>
      <div className="px-10 pb-8">
        <p
          className="cursor-pointer fixed top-[80px] text-grey-900 font-bold"
          onClick={() => route.push("/leaderboard")}
        >
          BACK
        </p>
        <div className="flex justify-center">
          <div className="max-w-[960px] w-[960px] h-full">
            {!loading ? (
              <>
                <h1 className="mb-4 text-4xl font-bold text-center uppercase text-grey-900">
                  {username}
                </h1>
                <div className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 sm:gap-3">
                  <div className="flex justify-center">
                    <img
                      src={currentUser.profileImage}
                      width="360px"
                      height="360px"
                      alt="profile"
                    />
                  </div>
                  <div className="flex flex-col gap-4 mt-4 font-medium sm:mt-0 text-grey-800">
                    <p>{detail?.bio}</p>
                    <p>{detail?.birthday}</p>
                    <p>{detail?.email}</p>
                    <p>{detail?.twitter}</p>
                    <FavoriteButton
                      mode={currentUser.liked || false}
                      setMode={() => {
                        setUserData(
                          userData.map((item) => {
                            if (item.username === username)
                              return {
                                ...item,
                                liked: item.liked ? false : true,
                              };
                            else return { ...item };
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <SpinnerBox />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
