const crypto = require('crypto');
const expireSpan = 3600 * 1000 * 24
const authEmailVerificationSecret = process.env.AUTH_EMAIL_VERIFICATION_SECRET

async function CreateUser (email: string, password: string) {
  const verificationToken = generateVerificationToken()
  const verificationTokenExpire = generateVerificationTokenExpire()
  return await User.create({ email, password, verificationToken, verificationTokenExpire })
    .then((data) => {
      return data
    }).catch((error: Error) => {
      throw error
    })
}

function generateVerificationToken () {
  return crypto.randomBytes(30).toString('hex')
}

function generateVerificationTokenExpire () {
  return new Date(Date.now() + expireSpan)
}

function signVerificationToken (email, verificationToken) {
  return jwt.sign({
    email,
    verificationToken
  }, authEmailVerificationSecret)
}

function verifySignedVerificationToken (token) {
  return jwt.verify(token, authEmailVerificationSecret)
}


export default {
  ...
  generateVerificationToken,
  generateVerificationTokenExpire,
  signVerificationToken
  verifySignedVerificationToken
  ...
}