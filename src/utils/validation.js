export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateRoomCode = (roomCode) => {
  if (!roomCode) return 'Room code is required';
  if (roomCode.length !== 6) return 'Room code must be 6 characters';
  if (!/^[A-Z0-9]+$/.test(roomCode)) return 'Room code must contain only uppercase letters and numbers';
  return null;
};

export const validatePlayerName = (name) => {
  if (!name) return 'Player name is required';
  if (name.length < 2) return 'Player name must be at least 2 characters';
  if (name.length > 20) return 'Player name must be less than 20 characters';
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) return 'Player name can only contain letters, numbers, and spaces';
  return null;
};

export const validateAmount = (amount, min = 0, max = Infinity) => {
  if (!amount && amount !== 0) return 'Amount is required';
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return 'Amount must be a valid number';
  if (numAmount < min) return `Amount must be at least ${min}`;
  if (numAmount > max) return `Amount must be at most ${max}`;
  return null;
};

export const createValidationSchema = (fields) => {
  const schema = {};
  
  fields.forEach(field => {
    switch (field.type) {
      case 'email':
        schema[field.name] = validateEmail;
        break;
      case 'password':
        schema[field.name] = validatePassword;
        break;
      case 'roomCode':
        schema[field.name] = validateRoomCode;
        break;
      case 'playerName':
        schema[field.name] = validatePlayerName;
        break;
      case 'amount':
        schema[field.name] = (value) => validateAmount(value, field.min, field.max);
        break;
      case 'custom':
        schema[field.name] = field.validator;
        break;
      default:
        schema[field.name] = (value) => {
          if (field.required && !value) return `${field.name} is required`;
          return null;
        };
    }
  });
  
  return schema;
};