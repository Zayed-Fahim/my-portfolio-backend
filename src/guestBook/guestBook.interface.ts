import { UserProps } from "src/user/user.interface";

export type InitialGuestBookProps = {
  message: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  ip: string;
};

export type GuestBookProps = {
  content: string;
  user: UserProps;
};
