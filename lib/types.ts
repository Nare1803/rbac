export interface PatientFormData {
  firstName:   string
  lastName:    string
  dateOfBirth: string
  phone?:      string
  address?:    string
}

export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT"
