export interface LoginResponse {
    teacher: {
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
    };
    accessToken: string;
  }
  