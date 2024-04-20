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
import { useRouter } from "next/navigation";
import { useState } from "react";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
});
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await createFoodOrder(values).catch((error: any) => {
      form.setError("name", {
        message: error.response.data,
      });
    });
    console.log(res);
    if (res) {
      router.push("/success?id=" + res.data.id);
    }
    setLoading(false);
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
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
