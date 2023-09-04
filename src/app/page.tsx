"use client";

import {
  useUsersDataQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  UsersDataDocument,
} from "@/generated/graphql";
import { FormEvent, useRef, useState } from "react";

export default function Home() {
  const [editableContent, setEditableContent] = useState(3);
  const { data, loading, error } = useUsersDataQuery({});
  const inputName = useRef<HTMLInputElement>(null);
  const [createUser, { loading: isCreatingUser }] = useCreateUserMutation({
    onCompleted: async (data) => {
      if (data) {
        if (inputName?.current?.value) {
          inputName.current.value = "";
        }
      }
    },
    update(cache, { data }) {
      if (data) {
        const newUser = data.createUser;
        cache.updateQuery({ query: UsersDataDocument }, (data) => {
          return {
            users: [...data.users, newUser],
          };
        });
      }
    },
    onError: (err) => window.alert(err),
  });

  const [updateUser] = useUpdateUserMutation({
    refetchQueries: [{ query: UsersDataDocument }],
    onError: (err) => window.alert(err),
  });

  const [deleteUser, { loading: isDeletingUser }] = useDeleteUserMutation({
    refetchQueries: [{ query: UsersDataDocument }],
    onError: (err) => window.alert(err),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = inputName?.current?.value || "";
    createUser({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  const handleDelete = (deleteUserId: number) => {
    deleteUser({
      variables: {
        deleteUserId,
      },
    });
  };

  const handleSubmitEdit = () => {
    const name = '12p';
    updateUser({
      optimisticResponse: {
        updateUser: {
          id: editableContent,
          name,
          __typename: 'User'
        },
      },
      variables: {
        updateUserId: editableContent,
        input: {
          name,
        },
      },
    });
    setEditableContent(0);
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input id="user" name="user" type="text" ref={inputName} />
          </fieldset>
          <button type="submit" disabled={isCreatingUser}>
            Submit
          </button>
        </form>
        {loading && <p>loading...</p>}
        <div>
          {data?.users?.map((user) => (
            <div key={user.id}>
              <div
              >
                {user.name}
              </div>
              <button
                type="button"
                disabled={isDeletingUser}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
              {/* <button type="button" onClick={() => setEditableContent(user.id)}> */}
              <button type="button" onClick={handleSubmitEdit}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
