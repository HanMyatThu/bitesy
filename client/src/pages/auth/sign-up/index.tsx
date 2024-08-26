import { AuthForm } from "../components/form";

export const SignUp = () => {
  return (
    <div className="mx-auto mt-28 flex w-full flex-col items-center justify-center px-6 py-0 lg:py-0">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign Up
          </h1>
          <AuthForm isSignIn={false} />
        </div>
      </div>
    </div>
  );
};
