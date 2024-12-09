import { proxy } from "valtio";
interface AppState {
  id: string;
  confirmPassword: string;
  password: string;
  newPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  open: boolean;
  open2: boolean;
  open3: boolean;
}

export const usersData = proxy<AppState>({
  id: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phoneNum: "",
  open: true,
  open2: true,
  open3: true,
});
