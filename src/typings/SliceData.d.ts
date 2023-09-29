export type TUserProps = {
  isExistingUser: boolean;
  status: "idle" | "error" | "loading";
};

export type TStateData = {
  user: TUserProps;
};
