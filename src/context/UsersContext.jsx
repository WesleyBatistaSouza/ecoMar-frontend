/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { notify } from "../components/notifications";
import { AuthContext } from "./authContext";

const baseUrl = import.meta.env.VITE_URL_API;

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const authEx = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/users`, authEx);
      setUsers(response.data);
    } catch {
      setError("Erro ao buscar usuários.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/users/${id}`, authEx);
      return response.data;
    } catch {
      setError("Erro ao buscar usuário.");
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/users`, newUser, authEx);
      setUsers((prev) => [...prev, response.data]);
      await fetchUsers();
    } catch {
      setError("Erro ao adicionar usuário.");
    }
  };

  const updateUser = async (id, userUpdated) => {
    try {
      const response = await axios.put(`${baseUrl}/api/auth/users/${id}`, userUpdated, authEx);
      notify("Usuário atualizado com sucesso!", "success");
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user))
      );
      await fetchUsers();
    } catch {
      setError("Erro ao atualizar usuário.");
    }
  };

  const deleteUser = async (id) => {
    try {
      console.log(id);
      await axios.delete(`${baseUrl}/api/auth/users/${id}`, authEx);
      notify("Usuário deletado com sucesso!", "success");
      setUsers((prev) => prev.filter((user) => user.id !== id));
      await fetchUsers();
    } catch {
      setError("Erro ao deletar usuário.");
    }
  };

  useEffect(() => {
    notify(error, "error");
  }, [error]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loadingUsers, error, fetchUsers, fetchUser, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};
