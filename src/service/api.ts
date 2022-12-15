import { documentsOneResponse, documentsTwoResponse } from './mock';
import { Document } from '../types/document';

const baseURL = 'https://test-backend-url.com';

export const getDocumentsOne = (): Promise<Document[]> => {
  // Имитация GET запроса на сервер
  fetch(`${baseURL}/documents1`).then((response) => console.log(response));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(documentsOneResponse);
    }, Math.random() * 1000);
  });
};

export const getDocumentsTwo = (): Promise<Document[]> => {
  // Имитация GET запроса на сервер
  fetch(`${baseURL}/documents2`).then((response) => console.log(response));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(documentsTwoResponse);
    }, Math.random() * 1000);
  });
};

export const cancelDocuments = (documents: string[]): Promise<void> => {
  // Имитация POST запроса на сервер
  fetch(`${baseURL}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(documents),
  }).then((response) => console.log(response));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * 1000);
  });
};
