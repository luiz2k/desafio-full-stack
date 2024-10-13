export type SignIn = {
  error?: boolean;
  message: string;
  data?: {
    acessToken: string;
  };
};
