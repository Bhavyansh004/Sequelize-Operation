const { sequelize, User } = require('./sequelize-setup');

async function createUser(username, email) {
  try {
    const user = await User.create({ username, email });
    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function getUsers() {
  try {
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function updateUser(id, newUsername, newEmail) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = newUsername;
      user.email = newEmail;
      await user.save();
      console.log('User updated:', user.toJSON());
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}


async function deleteUser(id) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      console.log('User deleted');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await createUser('Bhavyansh Nandwana', 'bhavyansh@.com');
    await getUsers();
    await updateUser(1, 'Bhavyansh Nandwana', 'bhavyansh@.com');
    await getUsers();
    await deleteUser(1);
    await getUsers();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
