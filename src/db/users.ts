import mongoose from "mongoose";

// this creates a new mongoose user schema

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // select false lets you not manipulate the data
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// this makes the schema available with the name "User"
export const UserModel = mongoose.model("User", UserSchema);

// this gets all users by running find with no arguments
export const getUsers = () => UserModel.find();

// this finds one user by the specified email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

//
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

//
export const getUserById = (id: string) => UserModel.findById(id);

// creates user with the given values and converts it to object
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject);

// deletes user by given id, mongoose gives everything an _id for convinience
export const deleteUserById = async (id: string) => {
  // this is how you write an async/await function for this application
  const deleteUser = await UserModel.findOneAndDelete({ _id: id });
  return deleteUser;
};

//
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate({ id, values });
