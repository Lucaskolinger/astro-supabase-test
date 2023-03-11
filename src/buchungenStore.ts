import { atom } from "nanostores";

export type Buchung = {
  id: number;
  created_at: Date;
  familienname: string;
  termin_wochentag: string;
  termin_uhrzeit: string;
};

export const buchung = atom({} as Buchung);
