export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' >;

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type Entry =
  HealthCheckEntry |
  OccupationalHealthcareEntry |
  HospitalEntry;

interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Period {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Period;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends EntryBase {
  type: "Hospital";
  discharge: Discharge;
}
