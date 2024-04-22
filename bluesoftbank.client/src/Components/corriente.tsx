import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const CorrientePage = () => {
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

    const PostAccount = async () => {
        try {
            const response = await axios.post('https://localhost:7222/api/Cuenta/corriente', {
                city: formData.city,
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email
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
    return (
        <>
            
            <Button onClick={handleOpen}
                style={{ backgroundColor: "#00afb9", borderRadius: 10, marginRight:20 }}>
                <Typography color="whitesmoke">
                Crear cuenta corriente
                </Typography>
            </Button>
            <Dialog onClose={handleClose} open={state}>
                <ToastContainer />
                <Grid item xs={12}>
                    <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop:20 }}>
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
                        <Button onClick={(() => PostAccount())} style={{ backgroundColor: "#009aff", borderRadius: 10, marginLeft: 10 }}>
                            <Typography color="whitesmoke">Aceptar</Typography>
                        </Button>
                        <Button onClick={handleClose}
                            style={{ backgroundColor: "#ff3808", borderRadius: 10, marginLeft: 10 }}><Typography color="whitesmoke">Cancelar</Typography></Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>)
}
export default CorrientePage