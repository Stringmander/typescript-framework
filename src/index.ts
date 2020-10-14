import { User, UserProps } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';

const user = User.buildUser({ name: 'NAME', age: 20})
let users = User.buildUserCollection();

const edit = document.getElementById('edit');
const list = document.getElementById('list');

if (edit) {
  new UserEdit(edit, user).render();
} else {
  throw new Error('Root element not found')
}

users.on('change', () => {
  if (list) {
    new UserList(list, users).render();
  }
});

users.fetch();

user.on('save', () => {
  users.models = [];
  users.fetch();
});