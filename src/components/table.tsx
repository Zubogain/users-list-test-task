import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { UsersTableProps, usersState } from "@/interfaces/users";
import { setUser } from "@/actions/user";
import { fetchUsers } from "@/actions/users";
import { useEffect } from "react";

const _dummyMap = new Array(10).fill(0);

const TableRowSkeleton = () => {
  return (
    <>
      {_dummyMap.map((item, index) => (
        <TableRow key={index.toString()}>
          <TableCell className="font-medium">
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell className="font-medium">
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
          <TableCell>
            <Skeleton className="p-4 align-middle [&:has([role=checkbox])]:pr-0 w-[100%]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const UsersTable: React.FC<UsersTableProps> = () => {
  const { items, isLoading }: usersState = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!items) dispatch(fetchUsers());
  }, []);

  return (
    <Table className="w-full">
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Surname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Date Of Registration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items ? (
          items.map((item) => (
            <TableRow key={item.id.toString()}>
              <TableCell className="font-medium">
                {item.id.toString()}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.surname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="break-all">
                {item.skills && item.skills.map((item) => item.text)}
              </TableCell>
              <TableCell>
                {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => dispatch(setUser(item))}
                >
                  <Link to={`/users/${item.id}`}>edit...</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRowSkeleton />
        )}
      </TableBody>
    </Table>
  );
};
