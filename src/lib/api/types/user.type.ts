import { inputObjectType, objectType } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
  },
});

const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.nonNull.string('name');
  },
});

const UserTypes = [User, UserInput];

export default UserTypes;