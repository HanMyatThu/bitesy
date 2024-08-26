import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertOctagon, Loader2Icon } from "lucide-react";
import { Link } from "@tanstack/react-router";

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

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

interface AuthFormProps {
  isSignIn: boolean;
}

export const AuthForm = ({ isSignIn = false }: AuthFormProps) => {
  const {
    data: loginData,
    mutateAsync,
    error: loginFormError,
    isSuccess: isLoginSuccess,
    reset: mutateReset,
  } = useUserLogin();

  const {
    data: singUpData,
    mutateAsync: userRegisterAsync,
    error: sigupFormError,
    reset: userRegisterReset,
    isSuccess: isRegisterSuccess,
  } = useUserRegister();

  useEffect(() => {
    userRegisterReset();
    mutateReset();
  }, [mutateReset, userRegisterReset]);

  console.log(isLoginSuccess, loginData, "login");
  console.log(isRegisterSuccess, singUpData, "login");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password should have minimum 8 charactors.")
      .refine(
        (value) => passwordRegex.test(value ?? ""),
        "Please enter a strong password",
      ),
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (isSignIn) {
        mutateAsync({
          email: data.email,
          password: data.password,
        });
      } else {
        userRegisterAsync({
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
        <div className="flex justify-between">
          <Button size="default" type="submit" className="rounded-lg">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          {form.formState.isSubmitting && (
            <Loader2Icon className="h-3 w-3 animate-spin" />
          )}
          <Link to={isSignIn ? "/sign-up" : "/sign-in"}>
            <Button variant="link">{label}</Button>
          </Link>
        </div>
      </form>
      {(loginFormError || sigupFormError) && (
        <section className="flex flex-1 gap-2 p-2">
          <AlertOctagon className="h-3 w-3 text-destructive 2xl:h-4 2xl:w-4" />
          <p className="text-xs text-destructive 2xl:text-sm 2xl:leading-none">
            {form.formState.errors.root?.message}
          </p>
        </section>
      )}
    </Form>
  );
};
