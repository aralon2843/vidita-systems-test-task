import { TableDocument } from '../types/document';
import { Order } from '../types/order';

export const sortByDeliveryDate = (arr: TableDocument[], order: Order) => {
  const sortCallBack = (a: TableDocument, b: TableDocument) =>
    Number(new Date(a.delivery_date)) - Number(new Date(b.delivery_date));

  return order === 'asc'
    ? arr.sort((a, b) => sortCallBack(a, b))
    : arr.sort((a, b) => sortCallBack(b, a));
};
