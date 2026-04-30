import { API_URL_SERVICE } from "../config/index.js";

const URL = `${API_URL_SERVICE}/club`;

// GET ALL (pagination)
export const getClubsService = async ({ page, limit }) => {
  const response = await fetch(`${URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "get club failed");
  }
  return data.data;
};

// SEARCH BY NAME
export const getClubsByNameService = async ({ name }) => {
  const response = await fetch(`${URL}/search/name?name=${name}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "search clubs by name failed");
  }
  return data.data;
};

// SEARCH BY CATEGORY
export const getClubsByCategoryService = async ({ category }) => {
  const response = await fetch(`${URL}/search/category?category=${category}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "search clubs by category failed");
  }
  return data.data;
};

// GET BY ID
export const getClubByIdService = async ({ id }) => {
  const response = await fetch(`${URL}/search/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "get club by id failed");
  }

  return data.data;
};

// CREATE (admin)
export const createClubService = async (clubData) => {
  const response = await fetch(`${URL}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clubData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "create club failed");
  }
  return data.data;
};

// UPDATE (admin)
export const updateClubService = async ({ id, clubData }) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clubData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "update club failed");
  }
  return data.data;
};

// DELETE (admin)
export const deleteClubService = async ({ id }) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "delete club failed");
  }
  return data.data;
};
