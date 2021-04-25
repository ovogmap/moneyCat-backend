const { google } = require('googleapis')
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    unique: true,
  },
  photos: {
    type: String,
  },
  provider: {
    type: String,
  },
  socialId: {
    type: String,
  },
})

UserSchema.statics.getGoogleProfile = async function (accessToken) {
  const { data } = await google.people('v1').people.get({
    access_token: accessToken,
    resourceName: 'people/me',
    personFields: 'names,emailAddresses,photos',
  })

  const profile = {
    socialId: data.resourceName?.replace('people/', '') ?? '',
    email: data.emailAddresses?.[0].value ?? '',
    photo: data.photos?.[0].url ?? null,
    displayName: data.names?.[0].displayName?.split(' (')[0] ?? '',
  }

  return profile
}

const User = mongoose.model('User', UserSchema)
module.exports = User
