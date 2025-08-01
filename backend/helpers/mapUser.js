module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    avatar: user.image_url,
    roleId: user.role_id,
    registeredAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
