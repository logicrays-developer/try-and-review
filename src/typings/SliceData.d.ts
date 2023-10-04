type TUserData = {
"_embedded":Object,
"additional_address":String,
"address":String,
"birth_day":String,
"city":String,
"country":String,
"district":String,
"email":String,
"emailVerified":Boolean,
"first_name":String,
"gender":String,
"language":String,
"last_name":String,
"phone":String,
"phoneVerified":Boolean,
"pictures":Object,
"postal_code":String,
"province":String,
"referral_code":Number,
"state":String,
"subdistrict":String,
"username":String
}
export type TUserProps = {
  isExistingUser: boolean;
  status: "idle" | "error" | "loading";
  userData: TUserData;
  accessToken: string;
  refreshToken: string;
};

export type TStateData = {
  user: TUserProps;
};
