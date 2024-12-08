import { proxy } from "valtio";

interface AppState {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export const studentData = proxy<AppState>({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
});
