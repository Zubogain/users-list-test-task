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

import { UserFormProps } from "@/interfaces/users";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { UserFormSchema } from "@/schemas/form";
import {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/usersApi";

export const UserCreateForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [tags, setTags] = React.useState<Tag[]>([]);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      skills: [],
    },
  });

  function onSubmit(user: z.infer<typeof UserFormSchema>) {
    console.log("asdasdasdasdads");
    createUser(user);
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
                <Input placeholder="name" {...field} />
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
                <Input placeholder="surname" {...field} />
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
                <Input placeholder="email" {...field} />
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
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" onClick={goBack} className="mr-6">
            Cancel
          </Button>
          <Button type="submit" className="px-4 py-2">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const UserEditForm: React.FC<UserFormProps> = (props) => {
  const { id } = useParams();

  const query = useGetUserQuery(id);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [tags, setTags] = React.useState<Tag[]>([]);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      skills: [],
    },
  });

  useEffect(() => {
    if (!query.isLoading && query.data) {
      form.setValue("name", query.data.name);
      form.setValue("surname", query.data.surname);
      form.setValue("email", query.data.email);
      setTags(query.data.skills);
      form.setValue("skills", query.data.skills as [Tag, ...Tag[]]);
    }
  }, [query.isLoading]);

  function onSubmit(user: z.infer<typeof UserFormSchema>) {
    // @ts-ignore
    updateUser({ ...user, id: id });
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
                {!query.isLoading ? (
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
                {!query.isLoading ? (
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
                {!query.isLoading ? (
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
                {!query.isLoading ? (
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
