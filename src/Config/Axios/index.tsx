import { Alert } from "react-native";
import { updateAccessToken } from "../../slices/userSlice";
import axiosInstance from "./axiosInstance";

const language = {
  severForbiddenError: "You are not authorized to make this request.",
  serverNotFoundError:
    "This data either does not exist or you are not authorized to view it.",
  serverRequestError:
    "The server is not responding. Please check your internet connection or try again later.",
  serverGenericError:
    "Something went wrong while attempting to process your request. Please try again later.",
  questionListWarning: "Please fill all the answers of question list",
  takePictureWarning: "Please submit a picture of the task.",
  fieldIsRequired: "This field is required",
  generalError: "Something went wrong. Please try again later.",
};

/**
 * @param url will contain GET request url endpoints.
 * @returns if response got success when return resolve body otherwise error portion render it.
 */

export const makeAuthenticatedGetRequest = (url: string): any => {
  return async (dispatch: any, getState: any) => {
    const state: any = getState();
    console.log("Access-Token GET Request---->", url);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
            status: response.status,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error.response) {
            const status: any = error.response.status;
            const dataError: any = error.response.data;
            switch (status) {
              case 401:
                // await dispatch(updateAccessToken(state?.user?.refreshToken));
                // const response = dispatch(makeAuthenticatedGetRequest(url));
                Alert.alert("Warning", dataError?.message);
                return resolve(error);
              case 403:
                Alert.alert("Warning", language.severForbiddenError);
                return reject(error);
              case 404:
                Alert.alert("Warning", language.serverNotFoundError);
                return reject(error);
              case 500:
                Alert.alert("Warning", language.serverGenericError);
                return reject(error);
              default:
                Alert.alert("Warning", language.generalError);
                return reject(error);
            }
          } else if (error.request) {
            Alert.alert("Warning", language.serverRequestError);
            return reject(error);
          } else {
            Alert.alert("Warning", language.serverGenericError);
            return reject(error);
          }
        });
    });
  };
};

/**
 * @param url will contain POST request url endpoints.
 * @param data also passing params data.
 * @returns if response got success when return resolve body otherwise error portion render it.
 */
export const makeAuthenticatedPostRequest = (url: string, data: any): any => {
  return async (dispatch: any, getState: any) => {
    const state: any = getState();
    console.log("Access-Token POST Request ---->", url, data);
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
            status: response.status,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error?.response) {
            const status: any = error.response.status;
            const dataError: any = error.response.data;
            switch (status) {
              case 400:
                Alert.alert("Warning", dataError?.message);
                return reject(error);
              case 401:
                // await dispatch(updateAccessToken(state?.user?.refreshToken));
                // const response = dispatch(
                //   makeAuthenticatedPostRequest(url, data)
                // );
                Alert.alert("Warning", dataError?.message);
                return resolve(error);
              case 403:
                Alert.alert("Warning", language.severForbiddenError);
                dataError?.detail[0];
                return reject(error);
              case 404:
                Alert.alert("Warning", language.serverNotFoundError);
                return reject(error);
              case 500:
                Alert.alert("Warning", language.serverGenericError);
                return reject(error);
              default:
                Alert.alert("Warning", language.generalError);
                return reject(error);
            }
          } else if (error.request) {
            Alert.alert("Warning", language.serverRequestError);
            return reject(error);
          } else {
            Alert.alert("Warning", language.serverGenericError);
            return reject(error);
          }
        });
    });
  };
};
