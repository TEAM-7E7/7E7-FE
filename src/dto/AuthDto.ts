export interface SignInDto {
  email: string;
  password: string;
}

export interface SingInFormDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  username?: string;
  password?: string;
}

export interface SignUpFormDto {
  email: string;
  username: string;
  password: string;
  password2: string;
}
