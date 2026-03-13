import { api } from "../service/apiHelper";

export const login = async (objectData) => {
  const response = await api.postPrivate("/auth/login", objectData);
  return response;
};


export const messageSend = async (objectData) => {
  const response = await api.postPrivate('/messages/createMessage', objectData)
  return response;
};


export const documentSend = async (objectData) => {
  const response = await api.postPrivate('/tbl-documents/createDocument', objectData);
  return response;
};


export const uploadDocumentSend = async (objectData) => {
  const response = await api.postPrivateMultiPart('/sub-documents/createSubDocument', objectData);
  return response;
}