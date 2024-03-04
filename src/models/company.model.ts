import { Schema, model } from 'mongoose';

export interface ICompany {
  regName?: string;
  innCode?: number;
  brandName: string;
  adressOffice?: {
    country: string;
    area: string;
    town: string;
    street: string;
    houseNumber: string;
    officeNumber: string;
  };
  contacts: {
    phone?: string;
    instagramAcc?: string;
    telegramAcc?: string;
  };
}

const companySchema = new Schema<ICompany>(
  {
    regName: { type: String, required: true },
    innCode: { type: Number, unique: true },
    brandName: String,
    adressOffice: {
      country: String,
      area: String,
      town: String,
      street: String,
      houseNumber: String,
      officeNumber: String,
    },
    contacts: {
      phone: String,
      instagramAcc: String,
      telegramAcc: String,
    },
  },
  {
    versionKey: false,
  },
);

export default model<ICompany>('CompanyInfo', companySchema);
