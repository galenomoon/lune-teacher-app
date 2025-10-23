export interface Modality {
  id: string;
  name: string;
}

export interface ClassModality {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  modalityId: string;
  createdAt: string;
  updatedAt: string;
  classLevelId: string;
  maxStudents: number;
  teacherId: string;
  modality: ClassModality;
}

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  cpf: string;
  rg: string;
  phone: string;
  email: string;
  instagram: string;
  priceHour: number;
  createdAt: string;
  updatedAt: string;
  password: string;
  imageUrl: string | null;
  pixKey: string;
  classes: Class[];
  modalities: Modality[];
}
