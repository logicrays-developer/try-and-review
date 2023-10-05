/**
 * @TUserProps user slice data types
 * for extra slices specific and export types from here
 */
export type TUserProps = {
  userData: any;
  accessToken: string;
  refreshToken: string;
};

/**
 * global state slices data type
 * add data in @TStateData when new slice add
 */
export type TStateData = {
  user: TUserProps;
};
