import { Suspense } from "react";
import { SignIn } from "./components/SignIn";

export function SignInPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SignIn />
    </Suspense>
  );
}
