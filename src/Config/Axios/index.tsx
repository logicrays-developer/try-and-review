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
 * @error [401] - If access-token expire got 401 error that time calling apis of refresh token and got again accesstoken and refresh token.
 * @returns if response got success when return resolve body otherwise error portion render it.
 */

export const makeAuthenticatedGetRequest = (url: string): any => {
  return async (dispatch: any, getState: any) => {
    const state: any = getState();
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
                await dispatch(updateAccessToken(state?.user?.refreshToken));
                const response = dispatch(makeAuthenticatedGetRequest(url));
                return resolve(response);
              case 403:
                showMessage({
                  message: language.serverForbiddenError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              case 404:
                showMessage({
                  message: language.serverNotFoundError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              case 500:
                showMessage({
                  message: language.serverGenericError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              default:
                showMessage({
                  message: language.generalError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
            }
          } else if (error.request) {
            showMessage({
              message: language.serverRequestError,
              type: "danger",
              duration: 3000,
            });
            return reject(error);
          } else {
            showMessage({
              message: language.serverGenericError,
              type: "danger",
              duration: 3000,
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
 * @error [401] - If access-token expire got 401 error that time calling apis of refresh token and got again accesstoken and refresh token.
 * @returns if response got success when return resolve body otherwise error portion render it.
 */
export const makeAuthenticatedPostRequest = (url: string, data: any): any => {
  return async (dispatch: any, getState: any) => {
    const state: any = getState();
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
            "Content-Type": "application/json",
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
                  duration: 3000,
                });
                return reject(error);
              case 401:
                await dispatch(updateAccessToken(state?.user?.refreshToken));
                const response = dispatch(
                  makeAuthenticatedPostRequest(url, data)
                );
                return resolve(response);
              case 403:
                showMessage({
                  message: language.serverForbiddenError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              case 404:
                showMessage({
                  message: language.serverNotFoundError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              case 500:
                showMessage({
                  message: language.serverGenericError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
              default:
                showMessage({
                  message: language.generalError,
                  type: "danger",
                  duration: 3000,
                });
                return reject(error);
            }
          } else if (error.request) {
            showMessage({
              message: language.serverRequestError,
              type: "danger",
              duration: 3000,
            });
            return reject(error);
          } else {
            showMessage({
              message: language.serverGenericError,
              type: "danger",
              duration: 3000,
            });
            return reject(error);
          }
        });
    });
  };
};
