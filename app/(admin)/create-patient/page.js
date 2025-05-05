"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { usePGlite } from "@electric-sql/pglite-react";

const formSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  dateofbirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  gender: z.enum(["male", "female", "others"], {
    errorMap: () => ({ message: "Select a valid gender" }),
  }),
  phonenumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => Number(val) > 0 && Number(val) < 120, {
      message: "Enter a valid age",
    }),
  symptons: z
    .string()
    .min(3, "Please describe symptoms. Enter at least 3 characters"),
  notes: z.string().optional(),
});

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];

function CreatePatient() {
  const { user } = useUser();
  const db = usePGlite();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      dateofbirth: "",
      gender: "",
      phonenumber: "",
      email: "",
      address: "",
      age: "",
      symptons: "",
      notes: "",
    },
  });

  async function onSubmit(values) {
    const userId = user?.id;
    const query = `
      INSERT INTO patients (
        userId, firstname, lastname, dateofbirth, gender,
        phonenumber, email, address, age, symptons, notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;

    const formValues = [
      userId,
      values.firstname,
      values.lastname,
      values.dateofbirth,
      values.gender,
      values.phonenumber,
      values.email,
      values.address,
      values.age,
      values.symptons,
      values.notes || "",
    ];

    const queryData = [userId];
    try {
      const data = await db.query(query, formValues);
      const data2 = await db.query(
        `SELECT * FROM patients WHERE userId = $1;`,
        queryData
      );
      console.log("@@@ praduman data", JSON.stringify(data2));
      form.reset();
      toast.success("Patient was registered successfully.");
    } catch (error) {
      toast.success("Failed to register patient. Please try again.");
      console.log("Error in registering patient", error);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 flex-col items-center justify-center md:flex-row md:space-x-10 bg-white m-10 rounded-md px-0 md:p-10">
      <div>
        <h1
          className="text-xl lg:text-3xl font-semibold mb-6 text-[#F4A261]"
          style={{
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Register a new patient
        </h1>
        <Toaster position="top-center" richColors />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateofbirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth*</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="dd/mm/yyyy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender*</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? genders.find(
                                  (gender) => gender.value === field.value
                                )?.label
                              : "Select"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {genders.map((gender) => (
                                <CommandItem
                                  value={gender.label}
                                  key={gender.value}
                                  onSelect={() => {
                                    form.setValue("gender", gender.value);
                                  }}
                                >
                                  {gender.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      gender.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address*</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symptons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptons*</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe Symptons" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Additional notes"
                      className="resize-none"
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreatePatient;
