interface IUserDetails {
  username: string;
  profileImage: string;
  score: number;
  liked?: boolean;
}

interface IUserContext {
  userData: IUserDetails[];
  setUserData: (update: IUserDetails[]) => void;
  getCurrentUser: (name: string) => IUserDetails;
}

interface IProfileData {
  username: string;
  bio: string;
  age: number;
  twitter: string;
  email: string;
  birthday: string;
}

type Status = "idle" | "loading" | "success" | "failed";

interface IAction {
  type: Status;
  payload: any;
}

type IFavoriteButton = {
  mode: boolean;
  setMode?: (param: any) => void;
};

export type {
  IUserContext,
  IUserDetails,
  IProfileData,
  Status,
  IAction,
  IFavoriteButton,
};
