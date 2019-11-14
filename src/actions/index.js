import axios from 'axios'

import { FETCH_USER } from './types'
//if only 1 expression can remove {} and return
export const fetchUser = ()=> async dispatch=>{
        const res = await axios.get('/api/current_user')
        dispatch({type:FETCH_USER, payload:res.data})//res is the output from axios
    }
export const handleToken = (token)=> async dispatch =>{
    //post to backend
    const res = await axios.post('/api/stripe',token)
    dispatch({type:FETCH_USER, payload:res.data})
}