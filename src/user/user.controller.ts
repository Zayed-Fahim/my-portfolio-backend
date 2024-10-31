import { InitialUserProps, UserProps } from "./user.interface";
import { addGuestUserService } from "./user.service";

const addGuestUserController = async (data: InitialUserProps) => {
  try {
    const result = await addGuestUserService(data as InitialUserProps);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Ops! Something went wrong!. Try again.",
    };
  }
};

export { addGuestUserController };
