import { Button } from "@mui/material";
import axios from "axios";
import React from "react"
import {  toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteAccount: React.FC<{ id: string }> = ({id }) => {
    const DeleteAccount = async () => {
        try {
            console.log("id "+id)
            const response = await axios.delete(`https://localhost:7222/api/Cuenta?id=${id}`);
            console.log('Respuesta del servidor:', response.data);
            toast("Cuenta Eliminada")
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    };
    return (
        <Button onClick={DeleteAccount}>
            <DeleteIcon style={{ color:"#ff3808" }} />
        </Button>)
}
export default DeleteAccount