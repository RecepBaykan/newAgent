import React from 'react';
import axios from 'axios';
import Base from 'antd/es/typography/Base';


const BASE_URL = 'http://128.0.1.196:9090/api/agent'
export const listAgents = () => axios.get(BASE_URL);

export const createAgent = (agent) => axios.post(BASE_URL, agent); 

export const getAgent = (id) => axios.get(BASE_URL + "/" + id)

export const updateAgent = (id, agent) => axios.put(BASE_URL + '/' + id, agent)

export const deleteAgent  = (id) => axios.delete(BASE_URL + '/' + id);