const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

async function getUsers(search = "", limit = 10, page = 1) {
  const [users, count] = await Promise.all([
    User.find({ login: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    User.countDocuments({ login: { $regex: search, $options: "i" } }),
  ]);

  if (!users || !count) {
    throw new Error("Error load data");
  }

  return {
    users: users,
    lastPage: Math.ceil(count / limit),
  };
}

function getUsersForAllNotes() {
  return User.find();
}

function getUser(id) {
  if (!id) {
    throw new Error("Error load data");
  }
  return User.findById(id);
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.USER, name: "User" },
    { id: ROLES.GUEST, name: "Guest" },
  ];
}

function deleteUser(id) {
  if (!id) {
    throw new Error("Error load data");
  }
  return User.deleteOne({ _id: id });
}

function updateUser(id, userData) {
  if (!id || !userData) {
    throw new Error("Error load data");
  }
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  getRoles,
  deleteUser,
  updateUser,
  getUsersForAllNotes,
};
