import Model from 'objection';

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }
}

export default User;
