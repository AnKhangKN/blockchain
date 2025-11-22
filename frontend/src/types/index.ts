export interface Student {
  _id: string;
  email: string;
  walletAddress: string; // địa chỉ MetaMask
}

export interface Teacher {
  _id: string;
  email: string;
  subjects: Subject[];
}

export interface Subject {
  _id: string;
  name: string;
}
