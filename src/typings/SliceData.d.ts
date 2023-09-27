export type TUserProps = {
  isExistingUser: boolean;
  status: 'idle' | 'error' | 'loading';
  favourites: any
};

export type TStateData = {
  user: TUserProps;
};