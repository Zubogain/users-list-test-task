import { UsersTable } from '@/components/table';

const Users = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-4 content-start items-center justify-center">
      <div className="col-span-2">
        <div className="text-4xl font-bold">Users list</div>
        <div className="text-lg text-muted-foreground">
          The advantages of Create-React-App and Shadcn UI, all in one place
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default Users;
