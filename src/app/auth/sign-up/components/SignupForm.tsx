"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthFields, authSchema } from "../../validations/auth";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/ui";
import { signup } from "../actions/signup";
import { toast } from "sonner";
import {  } from "@radix-ui/react-icons"

export default function SignupForm() {
  const form = useForm<AuthFields>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(data: AuthFields) {
    const { success, error } = await signup(data);

    if (success) {
      toast.success("Signed up successfully");
      form.reset();
      return;
    }

    toast.error(error);
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>Sign up with email</Button>
      </form>
    </Form>
  );
}
