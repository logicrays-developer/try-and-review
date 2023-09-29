export type TUserProps = {
  isExistingUser: boolean;
  status: "idle" | "error" | "loading";
  userData: object;
  accessToken: string;
  refreshToken: string;
  isExistingUser: boolean;
};

export type TStateData = {
  user: TUserProps;
};
