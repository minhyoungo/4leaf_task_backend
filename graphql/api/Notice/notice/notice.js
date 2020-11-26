import Notice from "../../../model/Notice";
import mongoose from "mongoose";
import User from "../../../model/User";

export default {
  Query: {
    viewAllNotice: async (_, args) => {
      try {
        const result = await Notice.find({}, {}).populate({
          path: `author`,
          model: User,
        });
        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
  Mutation: {
    createNotice: async (_, args) => {
      const { title, description, userId } = args;
      try {
        const user = mongoose.Types.ObjectId(userId);
        const result = await Notice.create({
          title,
          description,
          author: user,
          createAt: new Date().toString(),
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    deleteNotice: async (_, args) => {
      const { id } = args;
      try {
        const result = await Notice.deleteOne({ _id: id });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    updateNotice: async (_, args) => {
      const { id, title } = args;
      try {
        const result = await Notice.updateOne({ _id: id }, { $set: { title } });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
