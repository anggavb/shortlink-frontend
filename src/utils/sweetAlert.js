import Swal from "sweetalert2";

export function confirmDialog({
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  icon = "warning",
  text,
  title = "Are you sure?",
} = {}) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: "rounded-lg",
      title: "text-slate-900",
      htmlContainer: "text-slate-600",
      actions: "gap-3",
      confirmButton:
        "inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100",
      cancelButton:
        "inline-flex h-11 items-center justify-center rounded-lg bg-slate-100 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100",
    },
  });
}

export const alertDialog = {
  confirm: confirmDialog,
};
