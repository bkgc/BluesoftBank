import { Button, Dialog, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, {  useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const DetailsAccount: React.FC<{ id: string }> = ({ id }) => {
    const [state, setState] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        tipo: '',
        saldo: 0,
        fechaCreacion:'',
        city: '',
        name: '',
        lastName: '',
        email: '',
        tasaInteres: 0,
        sobregiro:0
    });
    const handleOpen = () => {
        setState(true)
    }
    const handleClose = () => {
        setState(false)
    }
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
    return (<>
        <Button onClick={GetAccount}>
            <Typography>Detalles</Typography>
        </Button>
        <Dialog onClose={handleClose} open={state}>
            <Grid item xs={12}>
                {formData.tipo == "ahorro" ? (
                    <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 20 }}>
                    Detalles de cuenta de ahorro
                    </Typography>) : (
                    <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 20 }}>
                    Detalles de cuenta corriente
                    </Typography>)}
                
            </Grid>
            <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
                <Grid item xs={12}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={ "times-new-roman"}>
                                Tipo de cuenta
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.tipo}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Saldo de cuenta
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.saldo}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Fecha de creacion
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.fechaCreacion}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Ciudad
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.city}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Nombres
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Apellidos
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                    Email
                                </Typography>
                                <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                    {formData.email}
                                </Typography>
                            </Grid>
                            {formData.tipo == "ahorro" ?
                                (
                                    <Grid item xs={6}>
                                        <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                            Tasa de interes
                                        </Typography>
                                        <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                            {formData.tasaInteres}
                                        </Typography>
                                    </Grid>
                            ):
                                (
                                    <Grid item xs={6}>
                                        <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                            Sobregiro
                                        </Typography>
                                        <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                            {formData.sobregiro}
                                        </Typography>
                                    </Grid>
                                )}
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleClose}
                        style={{ backgroundColor: "#ff3808", borderRadius: 10, marginLeft: 10 }}><Typography color="whitesmoke">Cerrar</Typography></Button>
                </Grid>
            </Grid>
        </Dialog>
    </>
    )
}
export default DetailsAccount