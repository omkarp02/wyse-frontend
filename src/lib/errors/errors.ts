import { toast } from "@/hooks/use-toast";

export const InternalServerError = () => {
  toast({
    title: "Something Went Wrong!",
    variant: "destructive",
  });
};

export const enum ERROR_STATUS {
  UNHANDLED = 1,
  ALREADY_EXIST = 2,
  INVALID_CRED = 4,
}
