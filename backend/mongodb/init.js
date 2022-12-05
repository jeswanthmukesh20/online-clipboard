db = db.getSiblingDB('clipboard');
db.createUser(
  {
    user: 'CopyTxT',
    pwd: 'S5tIvctcqDM9XYZX',
    roles: [{ role: 'readWrite', db: 'clipboard' }],
  },
);