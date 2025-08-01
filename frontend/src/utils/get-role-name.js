import { ROLE } from '../constans';

export const getRoleName = (roleId) => Object.keys(ROLE).find((key) => ROLE[key] === roleId);
