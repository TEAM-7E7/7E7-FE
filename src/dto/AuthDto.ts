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
  nickname: string;
  password: string;
}

export interface SignUpFormDto {
  email: string;
  emailToken: string;
  nickname: string;
  password: string;
  password2: string;
}
