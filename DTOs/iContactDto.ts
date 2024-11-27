export default interface IContactDto {
  token: string,
  captchaType: string,
  formData: {
    name: string,
    message: string,
    phoneNumber: string,
  }
}