import { updateAccessToken } from "../../slices/userSlice";
import axiosInstance from "./axiosInstance";
import { showMessage } from "react-native-flash-message";

const language = {
  serverForbiddenError: "You are not authorized to make this request.",
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
    console.log("state", state);
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
                showMessage({
                  message: dataError?.message[0],
                  type: "danger",
                });
                return reject(error);
              case 403:
                showMessage({
                  message: language.serverForbiddenError,
                  type: "danger",
                });
                return reject(error);
              case 404:
                showMessage({
                  message: language.serverNotFoundError,
                  type: "danger",
                });
                return reject(error);
              case 500:
                showMessage({
                  message: language.serverGenericError,
                  type: "danger",
                });
                return reject(error);
              default:
                showMessage({
                  message: language.generalError,
                  type: "danger",
                });
                return reject(error);
            }
          } else if (error.request) {
            showMessage({
              message: language.serverRequestError,
              type: "danger",
            });
            return reject(error);
          } else {
            showMessage({
              message: language.serverGenericError,
              type: "danger",
            });
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
    console.log("Access-Token POST Request ---->", state?.user?.accessToken);
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
                showMessage({
                  message: dataError?.message,
                  type: "danger",
                });
                return reject(error);
              case 401:
                // await dispatch(updateAccessToken(state?.user?.refreshToken));
                // const response = dispatch(
                //   makeAuthenticatedPostRequest(url, data)
                // );
                showMessage({
                  message: dataError?.message,
                  type: "danger",
                });
                return reject(error);
              case 403:
                showMessage({
                  message: language.serverForbiddenError,
                  type: "danger",
                });
                return reject(error);
              case 404:
                showMessage({
                  message: language.serverNotFoundError,
                  type: "danger",
                });
                return reject(error);
              case 500:
                showMessage({
                  message: language.serverGenericError,
                  type: "danger",
                });
                return reject(error);
              default:
                showMessage({
                  message: language.generalError,
                  type: "danger",
                });
                return reject(error);
            }
          } else if (error.request) {
            showMessage({
              message: language.serverRequestError,
              type: "danger",
            });
            return reject(error);
          } else {
            showMessage({
              message: language.serverGenericError,
              type: "danger",
            });
            return reject(error);
          }
        });
    });
  };
};
