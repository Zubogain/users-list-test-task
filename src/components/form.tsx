/* eslint-disable no-restricted-globals */
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TagInput, Tag } from "emblor";
import { Skeleton } from "./ui/skeleton";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { userState, UserFormProps } from "@/interfaces/users";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "@/actions/user";
import { UserFormSchema } from "@/schemas/form";

export const UserForm: React.FC<UserFormProps> = (props) => {
  const { isLoading, isError, message, item }: userState = useAppSelector(
    ({ user }) => user
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [tags, setTags] = React.useState<Tag[]>([]);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      id: 0,
      name: "",
      surname: "",
      email: "",
      skills: [],
    },
  });

  useEffect(() => {
    if (!item) {
      id && dispatch(fetchUser(id));
    } else {
      form.setValue("id", item.id || 0);
      form.setValue("name", item.name || "");
      form.setValue("surname", item.surname || "");
      form.setValue("email", item.email || "");

      setTags(item.skills);
      form.setValue("skills", item.skills as [Tag, ...Tag[]]);
    }
  }, [item]);

  function onSubmit(user: z.infer<typeof UserFormSchema>) {
    dispatch(updateUser(user));
  }

  const goBack = () => {
    history.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 grid">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                {item ? (
                  <Input placeholder="name" {...field} />
                ) : (
                  <Skeleton className="h-10 px-3 py-2 text-sm align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                {item ? (
                  <Input placeholder="surname" {...field} />
                ) : (
                  <Skeleton className="h-10 px-3 py-2 text-sm align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {item ? (
                  <Input placeholder="email" {...field} />
                ) : (
                  <Skeleton className="h-10 px-3 py-2 text-sm align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Skills</FormLabel>
              <FormControl className="p-3">
                {item ? (
                  <TagInput
                    {...field}
                    placeholder="Enter a skill"
                    tags={tags}
                    className="p-3"
                    setTags={(newTags) => {
                      setTags(newTags);
                      form.setValue("skills", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                ) : (
                  <Skeleton className="h-10 px-3 py-2 text-sm align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" onClick={goBack} className="mr-6">
            Cancel
          </Button>
          <Button type="submit" className="px-4 py-2">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
