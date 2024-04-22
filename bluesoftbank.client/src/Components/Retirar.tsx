import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const RetirarAccount: React.FC<{ id: string }> = ({ id }) => {
    const [state, setState] = useState<boolean>(false);
    const [saldo, setSaldo] = useState<number>(0);
    const [formData, setFormData] = useState({
        name: '',
        lastName: ''
    });
    const handleClose = () => {
        setState(false)
    }
    const handleOpen = () => {
        setState(true)
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSaldo(parseInt(e.target.value))
    };
    const GetAccount = async () => {
        try {
            const response = await axios.get(`https://localhost:7222/api/Cuenta/${id}`);
            setFormData(response.data)
            console.log('Respuesta del servidor:', response.data);
            toast(response.data)
            handleOpen()
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    }
    const PostRetiro = async () => {
        try {
            const response = await axios.post(`https://localhost:7222/api/Cuenta/retirar/${id}`, {
                saldo: saldo
            });
            console.log('Respuesta del servidor:', response.data);
            toast(response.data)
            handleClose();
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
            handleClose();
        }
    };
    return (<>
        <Button onClick={GetAccount}>
            <Typography>Retirar</Typography>
        </Button>
        <Dialog onClose={handleClose} open={state}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 20 }}>
                    Nueva Cuenta corriente
                </Typography>
            </Grid>
            <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
                <Grid item xs={12}>
                    <Typography>{formData.name} {formData.lastName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="saldo"
                        name="saldo"
                        label="Saldo"
                        type="number"
                        value={saldo}
                        onChange={handleChange}
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={(() => PostRetiro())} style={{ backgroundColor: "#009aff", borderRadius: 10, marginLeft: 10 }}>
                        <Typography color="whitesmoke">Aceptar</Typography>
                    </Button>
                    <Button onClick={handleClose}
                        style={{ backgroundColor: "#ff3808", borderRadius: 10, marginLeft: 10 }}><Typography color="whitesmoke">Cancelar</Typography></Button>
                </Grid>
            </Grid>
        </Dialog>
    </>
    )
}
export default RetirarAccount