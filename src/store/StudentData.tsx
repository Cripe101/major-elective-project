import { proxy } from "valtio";

interface AppState {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export const studentData = proxy<AppState>({
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
});
