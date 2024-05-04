import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBookingById } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (e) => {
      toast.error("Unable to delete Booking ");
      console.error(e);
    },
  });
  return { isDeleting, deleteBookingById };
}
