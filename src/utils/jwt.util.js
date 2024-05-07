import jwt from 'jsonwebtoken';

export function generateJwtToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return token;
}
