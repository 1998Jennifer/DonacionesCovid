// @flow

export interface DonationRequest {
  idcard: string;
  donor: string;
  recipient: string;
  type: string;
  description: string;
  ammount: string;
  createdAt: string;
}
