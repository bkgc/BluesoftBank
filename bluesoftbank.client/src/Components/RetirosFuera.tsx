import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
interface Usuario {
    tipo: string
    saldo: number
    movimientos: Extracto[]
    city: string
    name: string
    lastName: string
    email: string
    tasaInteres: number
    sobregiro: number
}
interface Extracto {
    monto: number
    fecha: Date
    tipo: number
}
const RetirosFueraPage = () => {
    const [Extracto, setExtracto] = useState<Usuario[]>([])
    const [city, setCity] = useState<string>("potosi")
    const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    };
    const GetExtractoAccount = async () => {
        try {
            const response = await axios.get<Usuario[]>(`https://localhost:7222/api/Cuenta/retirosfuera/${city}`);
            setExtracto(response.data)
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    }
    useEffect(() => {
        GetExtractoAccount()
    }, [])
    return (<>
        <Grid item xs={12}>
            <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 20 }}>
                Retiros fuera del Origen
            </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "left" }}>
            <TextField
                style={{ margin: 10 }}
                id="city"
                name="city"
                label="Ciudad de Origen"
                value={city}
                onChange={handleChangeCity}>
            </TextField>
            <Button onClick={GetExtractoAccount} style={{ margin: 10 }}>Buscar</Button>
        </Grid>
        <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
            {Extracto.map((user, index) => (
                <Grid item xs={12} key={index} style={{ marginBottom: 20, padding: 20, backgroundColor: "#ffab89", borderRadius: 15 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Tipo de cuenta
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.tipo}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Saldo
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.saldo}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Ciudad
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.city}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Nombres
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Apellidos
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                Email
                            </Typography>
                            <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                {user.email}
                            </Typography>
                        </Grid>
                        {user.tipo == "ahorro" ?
                            (
                                <Grid item xs={3}>
                                    <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                        Tasa de interes
                                    </Typography>
                                    <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                        {user.tasaInteres}
                                    </Typography>
                                </Grid>
                            ) :
                            (
                                <Grid item xs={3}>
                                    <Typography fontSize={14} fontFamily={"times-new-roman"}>
                                        Sobregiro
                                    </Typography>
                                    <Typography style={{ paddingLeft: 10, borderRadius: 5, borderStyle: "solid", borderColor: "#009aff" }} variant="h6" fontFamily={"times-new-roman"}>
                                        {user.sobregiro}
                                    </Typography>
                                </Grid>
                            )}
                        <Grid item xs={12}>
                            <Typography variant="h5" color="#009aff" fontFamily="times-new-roman">Movimientos</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Monto
                                        </TableCell>
                                        <TableCell>
                                            Fecha
                                        </TableCell>
                                        <TableCell>
                                            Tipo
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.movimientos.map((move, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {move.monto}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(move.fecha).toLocaleDateString()}
                                            </TableCell>
                                            {move.tipo == 1 ? (
                                                <TableCell>
                                                    Retiro
                                                </TableCell>) : (
                                                <TableCell>
                                                    Consignacion
                                                </TableCell>)}
                                        </TableRow>))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>))}

        </Grid>
    </>
    )
}
export default RetirosFueraPage