export interface SignInDto {
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
  nickname: string;
  password: string;
  password2: string;
}

export interface PasswordSearchFormDto {
  email: string;
  password: string;
  password2: string;
}

export interface PasswordChangeDto {
  password: string;
}

export interface PasswordChangeFormDto {
  password: string;
  password2: string;
}

export interface NicknameChangeDto {
  nickname: string;
}
