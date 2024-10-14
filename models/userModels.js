class User {
    constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password; // La contraseña será almacenada en hash.
    }
  }
  
  export default User;