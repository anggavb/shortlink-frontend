import { ToastContainer } from "react-toastify";
import { toastConfig } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";

function AppToastContainer() {
  return <ToastContainer {...toastConfig} />;
}

export default AppToastContainer;
