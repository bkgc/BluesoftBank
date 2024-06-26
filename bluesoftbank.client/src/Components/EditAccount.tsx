import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const EditAccount: React.FC<{ id: string }> = ({ id }) => {
    const [state, setState] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        city: '',
        name: '',
        lastName: '',
        email: ''
    });
    const handleOpen = () => {
        setState(true)
    }
    const handleClose = () => {
        setFormData({
            city: '',
            name: '',
            lastName: '',
            email: ''
        })
        setState(false)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const GetAccount = async () => {
        try {
            const response = await axios.get(`https://localhost:7222/api/Cuenta/${id}`);
            setFormData(response.data)
            console.log('Respuesta del servidor:', response.data);
            toast(response.data)
            handleOpen()
            // Aqu� puedes manejar la respuesta del servidor seg�n sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    }
    const PutAccount = async () => {
        try {
            const response = await axios.put(`https://localhost:7222/api/Cuenta/${id}`, {
                city: formData.city,
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email
            });
            console.log('Respuesta del servidor:', response.data);
            toast(response.data)
            handleClose();
            // Aqu� puedes manejar la respuesta del servidor seg�n sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
            handleClose();
        }
    };
    return (<>
        <Button onClick={GetAccount}>
            <Typography>Editar</Typography>
        </Button>
        <Dialog onClose={handleClose} open={state}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 20 }}>
                    Nueva Cuenta corriente
                </Typography>
            </Grid>
            <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
                <Grid item xs={12}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="Ciudad"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Apellido"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={(() => PutAccount())} style={{ backgroundColor: "#009aff", borderRadius: 10, marginLeft: 10 }}>
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
export default EditAccount