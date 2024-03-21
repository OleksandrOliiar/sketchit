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
import { signin } from "../actions/signin";
import { toast } from "sonner";

export default function SigninForm() {
  const form = useForm<AuthFields>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  async function onSubmit(data: AuthFields) {
    const { success, error } = await signin(data);

    if (success) {
      toast.success("Signed in successfully");
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
        <Button disabled={isSubmitting}>Sign in with email</Button>
      </form>
    </Form>
  );
}
