import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertOctagon, Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserLogin, useUserRegister } from "@/hooks/user";
import { getErrorMessage } from "@/lib/common";
import { useUser } from "@/contexts/user";

interface AuthFormProps {
  isSignIn: boolean;
}

export const AuthForm = ({ isSignIn = false }: AuthFormProps) => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const {
    data: loginData,
    mutateAsync,
    isError: loginFormError,
    isSuccess: isLoginSuccess,
    reset: mutateReset,
  } = useUserLogin();

  const {
    data: singUpData,
    mutateAsync: userRegisterAsync,
    isError: sigupFormError,
    reset: userRegisterReset,
    isSuccess: isRegisterSuccess,
  } = useUserRegister();

  useEffect(() => {
    userRegisterReset();
    mutateReset();
  }, [mutateReset, userRegisterReset]);

  useEffect(() => {
    if (isSignIn && loginData?.profile && isLoginSuccess) {
      setUser(loginData.profile);
      toast.success("You have login successfully");
      setTimeout(() => {
        navigate({ to: "/" });
      }, 3000);
    } else if (isSignIn && singUpData?.message && isRegisterSuccess) {
      toast.success(singUpData.message);
    }
  }, [
    isSignIn,
    loginData,
    isLoginSuccess,
    isRegisterSuccess,
    singUpData,
    setUser,
    navigate,
  ]);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("Please enter a valid email"),
    password: z.string(),
    name: !isSignIn
      ? z.string().min(1, "Please Enter Your Name")
      : z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    form.clearErrors();
    try {
      if (isSignIn) {
        await mutateAsync({
          email: data.email,
          password: data.password,
        });
      } else {
        await userRegisterAsync({
          email: data.email,
          password: data.password,
          name: data.name,
        });
      }
    } catch (e) {
      const message = getErrorMessage(e);
      form.setError("root", {
        message,
      });
    }
  };

  const label = isSignIn
    ? "You don't have an account?"
    : "You have already got an account?";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {!isSignIn && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Name" {...field} />
                </FormControl>
                {form.formState.errors.name && (
                  <FormMessage>
                    {form.formState.errors.name.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Email" {...field} />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>
                  {form.formState.errors.password.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <div className="flex justify-between text-center">
          <Button size="default" type="submit" className="rounded-lg">
            {isSignIn ? "Sign In" : "Sign Up"}
            {form.formState.isSubmitting && (
              <Loader2Icon className="ml-2 size-4 animate-spin" />
            )}
          </Button>
          <Link to={isSignIn ? "/sign-up" : "/sign-in"}>
            <Button variant="link">{label}</Button>
          </Link>
        </div>
      </form>
      {(loginFormError || sigupFormError) && (
        <div className="justify-left flex flex-1 gap-x-2 p-2">
          <AlertOctagon className="mt-1 size-3 text-destructive md:size-4" />
          <p className="text-sm text-destructive 2xl:text-sm 2xl:leading-none">
            {form.formState.errors.root?.message}
          </p>
        </div>
      )}
    </Form>
  );
};
