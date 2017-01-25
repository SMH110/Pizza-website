import User, { User as IUser, encryptPassword } from '../models/user.model';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default async function () {
    console.log("Migration 1 starting. Deleting existing users.");
    await User.remove({});

    console.log("Encrypting Admin password.");
    let encryptedPassword = await encryptPassword(ADMIN_PASSWORD);

    console.log("Inserting Admin user.");
    await new User({ email: ADMIN_EMAIL, password: encryptedPassword } as IUser).save();

    console.log("Admin user inserted. Migration 1 complete.");
};