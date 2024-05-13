import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import moment from "moment";

import { UsersTableProps } from "@/interfaces/users";
import { useGetAllUsersQuery } from "@/services/usersApi";

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
  const query = useGetAllUsersQuery("");

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
        {!query.isLoading ? (
          query.data?.map((user) => (
            <TableRow key={user.id.toString()}>
              <TableCell className="font-medium">
                {user.id.toString()}
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="break-all">
                {user.skills && user.skills.map((item) => item.text)}
              </TableCell>
              <TableCell>
                {moment(user.created_at).format("MMMM Do YYYY, h:mm:ss a")}
              </TableCell>
              <TableCell>
                <Button variant="outline">
                  <Link to={`/users/${user.id}`}>edit...</Link>
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
