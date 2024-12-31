"use client";

import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { searchUsers } from "@/app/actions/actions";
import { UserCard } from "./user-card";
import { User } from "@/app/actions/schemas";

// Option type for AsyncSelect
interface Option {
  value: string;
  label: string;
  user: User;
}

const UserSearchAndList: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]); // Start with an empty user list

  // Load options for AsyncSelect
  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const users = await searchUsers(inputValue);
    return users.map((user) => ({ value: user.id, label: user.name, user }));
  };

  // Handle AsyncSelect change
  const handleSearchChange = (option: Option | null) => {
    setSelectedUser(option ? option.user : null);
  };

  // Handle deletion of a user
  const handleDelete = (id: string) => {
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null); // Clear selected user if it's deleted
    }
  };

  return (
    <div className="space-y-6">
      {/* User Search Component */}
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleSearchChange}
        placeholder="Search for a user..."
        className="w-full max-w-md mx-auto"
      />
      {/* Display selected user from search */}
      {selectedUser && (
        <UserCard
          user={selectedUser}
          onDelete={(id) => {
            setSelectedUser(null); // Clear selected user after deletion
          }}
        />
      )}
      {/* Display predefined user list */}
      <div className="space-y-4">
        {userList.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default UserSearchAndList;
