const ROLES_LIST = {
  Role1: 1,
  Role2: 2,
  Role3: 3,
};

const ROLE_GROUPS = {
  Group1: [ROLES_LIST.Role1],
  Group2: [ROLES_LIST.Role1, ROLES_LIST.Role2],
  Group3: [ROLES_LIST.Role1, ROLES_LIST.Role2, ROLES_LIST.Role3],
};

module.exports = {
  ROLES_LIST,
  ROLE_GROUPS,
};
