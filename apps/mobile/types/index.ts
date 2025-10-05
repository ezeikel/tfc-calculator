export type Child = {
  id: string;
  name?: string;
  dateOfBirth: string;
  reconfirmationDate: string;
  quarterlyTopUpReceived: number;
};

export type Payment = {
  id: string;
  childId: string;
  amount: number;
  parentPaid: number;
  governmentTopUp: number;
  date: string;
  description?: string;
};
