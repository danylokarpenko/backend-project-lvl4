import { encrypt } from '../lib/secure.js';

export default (sequelize, DataType) => {
  const User = sequelize.define('User', {
    firstName: DataType.STRING,
    lastName: DataType.STRING,
    email: {
      type: DataType.STRING,
      unique: true,
      set(val) {
        this.setDataValue('email', val.toString().toLowerCase());
      },
      validate: {
        isEmail: true,
      },
    },
    passwordDigest: {
      type: DataType.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.VIRTUAL,
      set(value) {
        this.setDataValue('passwordDigest', encrypt(value));
        this.setDataValue('password', value);
        return value;
      },
      validate: {
        len: [1, +Infinity],
      }
    }
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    },
  });
  return User;
}
