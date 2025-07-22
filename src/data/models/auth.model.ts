export class AuthModel{
  username: string;

  constructor(
    username?: string,
  ) {
    this.username = username ?? "";
  }

  static toJson(data: AuthModel){
    return {
      username: data.username ?? "",
    }
  }
}

