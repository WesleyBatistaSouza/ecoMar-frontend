/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { notify } from "../components/notifications/notifications";

const baseUrl = import.meta.env.VITE_URL_API;

const authEx = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTkwOTI2MzItOTY5MS00M2EyLTg3N2EtZGU3NzU2ZDJhZTZkIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE3Mjg0ODE0NTksImV4cCI6MTcyODQ4NTA1OX0.SNBTlVth4a285Vd6lIjKzqpTKYF3ODaZcNtg58TZtSI`,
  }
}

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPoints = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/points`);
      setPoints(response.data);
    } catch {
      setError("Erro ao buscar ponto de coleta.");
    } finally {
      setLoading(false);
    }
  };

  const addPoint = async (newPoint) => {
    try {
      const response = await axios.post(`${baseUrl}/api/points`, newPoint, authEx);
      setPoints((prev) => [...prev, response.data]);
      fetchPoints();
    } catch {
      notify("Erro ao adicionar ponto de coleta.", "error");
      setError("Erro ao adicionar ponto de coleta.");
    }
  };

  const updatePoint = async (id, pointUpdated) => {
    try {
      const response = await axios.put(`${baseUrl}/api/points/${id}`, pointUpdated, authEx);
      notify("Ponto de coleta atualizado com sucesso!", "success");
      setPoints((prev) =>
        prev.map((point) => (point.id === id ? response.data : point))
      );
      fetchPoints();
    } catch {
      notify("Erro ao atualizar ponto de coleta.", "error");
      setError("Erro ao atualizar ponto de coleta.");
    }
  };

  const deletePoint = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/points/${id}`, authEx);
      notify("Ponto de coleta deletado com sucesso!", "success");
      setPoints((prev) => prev.filter((point) => point.id !== id));
      fetchPoints();
    } catch(err) {
      console.log(err);
      notify("Erro ao deletar ponto de coleta.", "error");
      setError("Erro ao deletar ponto de coleta.");
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <PointsContext.Provider value={{ points, loading, error, fetchPoints, addPoint, updatePoint, deletePoint }}>
      {children}
    </PointsContext.Provider>
  );
};
