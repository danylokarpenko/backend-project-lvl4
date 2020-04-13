import crypto from 'crypto';

export const secret = 'a%Bc4d_salt_eF8g#';

export const encrypt = (value) => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
