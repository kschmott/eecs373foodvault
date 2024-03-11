"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { createFoodOrder } from "@/lib/calls/foodOrders";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
});
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createFoodOrder(values).catch((error: any) => {
      form.setError("name", {
        message: error.response.data,
      });
    });
  }
  return (
    <main className="md:container mx-auto flex flex-col pt-4 items-center">
      <h1 className="text-center text-3xl  font-bold">Food Vault</h1>
      <div className="max-w-[600px] w-full px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name you made your food order with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
