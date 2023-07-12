import axios from "axios"

const baseUrl = 'https://fso-phonebook-wjnd.onrender.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
  return axios.delete(baseUrl + `/${id}`)
}

const update = (id, updatedPerson) => {
  return axios.put(baseUrl + `/${id}`, updatedPerson)
}

export default { getAll, create, deletePerson, update }
