class UserService {
  constructor(uri) {
    this.baseUrl = uri;
  };

  static signUp(user) {
    console.log('registering a new user');
    console.log(user);
  };

  static signIn(email, password) {
    console.log(`signing in the user with email: ${email} and password: ${password}`);
  };
};

// const userService = new UserService();

// userService.signUp({ firstName: 'John', lastName: 'Doe' });
// userService.signIn('nma.prob@gmail.com', 'korvkorvkorv');

// static, so can use directly on class
UserService.signUp({ firstName: 'John', lastName: 'Doe' });
