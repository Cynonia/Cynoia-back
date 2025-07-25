db = db.getSiblingDB('cynoia_db')

db.createUser({
  user: 'cynoia_user',
  pwd: 'cynoia_password',
  roles: [
    {
      role: 'readWrite',
      db: 'cynoia_db',
    },
  ],
})

db.createCollection('users')
