import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      toast.success(
        "Account Successfully created! Please verify the new account from the user's email address "
      );
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { signUp, isSigningUp };
}
