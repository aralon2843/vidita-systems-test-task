export interface Document {
  id: string;
  status: string;
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
}

type AllType = { all?: number };
export type TableDocument = Document & AllType;
