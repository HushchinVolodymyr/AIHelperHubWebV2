export default interface ILoginDto {
  token: string;
  captchaType: string;
  userData: {
    username: string;
    password: string;
  }
}