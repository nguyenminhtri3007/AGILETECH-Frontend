export class UserModel{
  id: string;
  name: string;
  email: string;
  
  constructor(
    id?: string,
    name?: string,
    email?: string
  ) {
    this.id = id ?? '';
    this.name = name ?? '';
    this.email = email ?? '';
  }

  static fromJson(data: any){
    const model = new UserModel();
    model.id = data?.id ?? '';
    model.name = data?.name ?? '';
    model.email = data?.email ?? '';

    return model;
  }
}