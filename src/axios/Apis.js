import axios from "axios";
import api from "./axios";

export const registerUser = (form) => {
  return api.post("/auth/register", form);
};

export const login = (form) => {
  return api.post("/auth/login", form);
};

export const getAllHabitByUser = (userId, page = 0, size = 10) => {
  return api.get(`/api/habits/user/${userId}`, {
    params: { page, size },
  });
};
export const createHabit = (form) => {
  return api.post("/api/habits", form);
};
export const deleteHabit = (id) => {
  return api.delete(`/api/habits/${id}`);
};
export const getAllHabitLog = (habitId) => {
  return api.get(`api/habit-logs/habit/${habitId}`);
};
export const changeHabitLogStatus = (habitLogId, status, date) => {
  return api.put(`/api/habit-logs/${habitLogId}/status`, null, {
    params: { status, date },
  });
};
export const statisticsOfUser = (userId) => {
  return api.get(`/api/analytics/${userId}`);
};
export const getAllAwards = () => {
  return api.get("/api/awards");
};
export const getAwardForUser = (userId) => {
  return api.get(`/api/userAwards/${userId}`);
};
export const getCount = (userId) => {
  return api.get(`/api/habits/count/${userId}`);
};
export const getStreak = (userId) => {
  return api.get(`/api/streaks/${userId}`);
};
