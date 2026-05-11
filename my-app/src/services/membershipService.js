import { API_URL_SERVICE } from "../config/index";

const URL = `${API_URL_SERVICE}/membership`;

//1. Join club
export const joinClubService = async ({ clubId }) => {
  const response = await fetch(`${URL}/${clubId}/join`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//2. Leave club
export const leaveClubService = async ({ clubId }) => {
  const response = await fetch(`${URL}/${clubId}/leave`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//3. Get club members
export const getClubMembersService = async ({ clubId }) => {
  const response = await fetch(`${URL}/${clubId}/members`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//4. Get current user's clubs
export const getUserClubsService = async () => {
  const response = await fetch(`${URL}/my-clubs`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//5. Update member role by admin
export const updateMemberRoleByAdminService = async ({
  clubId,
  memberId,
  roleInClub,
}) => {
  const response = await fetch(`${URL}/${clubId}/members/${memberId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      roleInClub,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//6. Delete member by admin
export const deleteMemberByAdminService = async ({ clubId, memberId }) => {
  const response = await fetch(`${URL}/${clubId}/members/${memberId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};
