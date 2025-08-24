import axios from 'axios'


export const API_BASE = 'http://localhost:3001'


export const api = axios.create({
baseURL: API_BASE,
headers: { 'Content-Type': 'application/json' }
})


// convenience wrappers
export const MoviesAPI = {
list: () => api.get('/movies').then(r => r.data),
get: (id) => api.get(`/movies/${id}`).then(r => r.data),
create: (data) => api.post('/movies', data).then(r => r.data),
update: (id, data) => api.put(`/movies/${id}`, data).then(r => r.data),
remove: (id) => api.delete(`/movies/${id}`).then(r => r.data)
}


export const ShowtimesAPI = {
list: () => api.get('/showtimes').then(r => r.data),
get: (id) => api.get(`/showtimes/${id}`).then(r => r.data),
create: (data) => api.post('/showtimes', data).then(r => r.data),
update: (id, data) => api.put(`/showtimes/${id}`, data).then(r => r.data),
patch: (id, data) => api.patch(`/showtimes/${id}`, data).then(r => r.data),
remove: (id) => api.delete(`/showtimes/${id}`).then(r => r.data)
}


export const BookingsAPI = {
list: () => api.get('/bookings').then(r => r.data),
get: (id) => api.get(`/bookings/${id}`).then(r => r.data),
create: (data) => api.post('/bookings', data).then(r => r.data),
update: (id, data) => api.put(`/bookings/${id}`, data).then(r => r.data),
remove: (id) => api.delete(`/bookings/${id}`).then(r => r.data)
}