import API from "./api";

export const getLeads = async (
  page = 1,
  search = "",
  status = "",
  source = "",
  sort = "latest"
) => {
  const response = await API.get(
    `/leads?page=${page}&search=${search}&status=${status}&source=${source}&sort=${sort}`
  );

  return response.data;
};

export const createLead = async (data: {
  name: string;
  email: string;
  source: string;
  status: string;
}) => {
  const response = await API.post("/leads", data);

  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await API.delete(`/leads/${id}`);

  return response.data;
};

export const updateLead = async (id: string, data: object) => {
  const response = await API.put(`/leads/${id}`, data);

  return response.data;
};
