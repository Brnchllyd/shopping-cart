toastr.options = {
  closeButton: false,
  positionClass: "toast-bottom-left",
  timeOut: 500,
  preventDuplicates: true,
};

function successOrder(message = "Successfully Processed.") {
  toastr.success(message);
}