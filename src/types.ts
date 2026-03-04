export type ContractType = 'services' | 'rental' | 'collaboration';

export interface Party {
  name: string;
  dni: string;
}

export interface BaseContract {
  party1: Party;
  party2: Party;
  startDate: string;
  endDate: string;
  amount: string;
  paymentMethod: 'transfer' | 'cash' | 'bizum';
  additionalClauses: string;
}

export interface ServicesContract extends BaseContract {
  type: 'services';
  serviceDescription: string;
  deliverables: string;
}

export interface RentalContract extends BaseContract {
  type: 'rental';
  propertyAddress: string;
  deposit: string;
}

export interface CollaborationContract extends BaseContract {
  type: 'collaboration';
  projectDescription: string;
  party1Percentage: string;
  party2Percentage: string;
}

export type Contract = ServicesContract | RentalContract | CollaborationContract;

export interface FormData {
  party1Name: string;
  party1DNI: string;
  party2Name: string;
  party2DNI: string;
  startDate: string;
  endDate: string;
  amount: string;
  paymentMethod: 'transfer' | 'cash' | 'bizum';
  additionalClauses: string;
  serviceDescription?: string;
  deliverables?: string;
  propertyAddress?: string;
  deposit?: string;
  projectDescription?: string;
  party1Percentage?: string;
  party2Percentage?: string;
}
