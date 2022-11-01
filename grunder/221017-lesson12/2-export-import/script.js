import User from './models/UserModels.js';
import { UserService } from './services/UserService.js';
import { sendSMS } from './functions/Functions.js';
import validatePassword from './functions/Functions.js';

if(!validatePassword('abc')) {
  console.log('lösen måste innehålla en siffra');
} else {
  const user = new User('Nik', 'Sod', 'nma', 'abc');
  UserService.signUp(user);
};
