import jwt from 'jwt';

export function generateJwtToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return token;
}
