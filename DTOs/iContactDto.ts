export default interface IContactDto {
  token: string, 
  formData: {
    name: string,
    message: string,
    phoneNumber: string,
  }
}