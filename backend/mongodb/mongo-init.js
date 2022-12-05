db.createUser(
    {
        user: "CopyTxT",
        pwd: "S5tIvctcqDM9XYZX",
        roles: [
            {
                role: "readWrite",
                db: "clipboard"
            }
        ]
    }
);