import { toast } from "react-toastify";

export const toastNotification = (msg: string, type: string, duration: any) => {
  return type === "success"
    ? toast.success(msg, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    : toast.error(msg, {
        position: "bottom-left",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
};
