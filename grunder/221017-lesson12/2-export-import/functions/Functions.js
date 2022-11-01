export default function validatePassword(value) {
  const regEx = /^\d+$/;

  return regEx.test(value);
};

export const sendSMS = () => {
  console.log('Sending SMS');
};
