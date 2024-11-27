export default interface IRegisterDto {
  token: string;
  captchaType: string;
  userData: {
      username: string;
      email: string;
      password: string;
  }
}