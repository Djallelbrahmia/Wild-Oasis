import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: isLogingOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/login", {
        replace: true,
      });
      toast.success("Loged out");
    },
    onError(e) {
      toast.error(e.message);
    },
  });
  return { logout, isLogingOut };
}
