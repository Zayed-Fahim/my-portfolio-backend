import { InitialUserProps, UserProps } from "./user.interface";
import User from "./user.model";

const addGuestUserService = async (data: InitialUserProps): Promise<any> => {
  const found = await User.findOne({ email: data.email });
  if (found) return { id: found?._id };

  const authorGmailList = [
    "nirob.fahim.1000.bf@gmail.com",
    "sayed15-13268@diu.edu.bd",
    "sayedasifzayed@gmail.com",
    "work.zayedfahim@gmail.com",
  ];

  const isAuthor = authorGmailList.includes(data.email);

  const newUserData: UserProps = {
    ip: data.ip,
    type: isAuthor ? "author" : "user",
    email: data.email,
    name: data.name,
    image: data.image || "",
  };

  const result = await User.create(newUserData as UserProps);

  return { id: result?._id };
};

export { addGuestUserService };
