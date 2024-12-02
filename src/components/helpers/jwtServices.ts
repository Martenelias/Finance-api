import jwt from 'jsonwebtoken';
import config from '../../config';

interface IPayload {
  id: number;
  role: string;
}

const generateToken = (payload: IPayload): string => {
  return jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: '4h',
  });
};

const verifyToken = (token: string): IPayload => {
  return jwt.verify(token, config.jwtSecret as string) as IPayload;
};

export default { generateToken, verifyToken };