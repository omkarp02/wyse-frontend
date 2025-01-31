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
  NOT_FOUND = 3,
  INVALID_CRED = 4,
  UN_AUTHORIZED = 5,
  INTERNAL_SERVER_ERROR = 6,
  VALIDATION_ERROR = 7,
  DATABASE_ERROR = 8,
  INVALID_TOKEN = 9
}
