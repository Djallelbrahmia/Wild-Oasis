import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard", {
        replace: true,
      });
      toast.success("Success");
    },
    onError: (err) => {
      console.error("Error", err);
      toast.error("Provided email or password are wrong");
    },
  });
  return { login, isLogingIn };
}
