import _1AddAdminUser from './1-add-admin-user';

export async function runMigrations() {
    await _1AddAdminUser();
}