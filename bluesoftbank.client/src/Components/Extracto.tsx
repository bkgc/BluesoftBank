import { Button, Dialog, Grid, Table, TableBody, TableCell, TableHead, TableRow,  TextField,  Typography } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface Extracto {
    monto: number
    fecha: Date
    tipo: number
}
const ExtractoAccount: React.FC<{ id: string }> = ({ id }) => {
    const [state, setState] = useState<boolean>(false);
    const [movement, setMovement] = useState<Extracto[]>([])
    const [year, setYear] = useState<string>("2024")
    const [month, setMonth] = useState<string>("4")
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
    const handleChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
        setMonth(e.target.value)
    };
    const handleChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value)
    };
    const GetAccount = async () => {
        try {
            const response = await axios.get(`https://localhost:7222/api/Cuenta/${id}`);
            setFormData(response.data)
            console.log('Respuesta del servidor:', response.data);
            GetExtractoAccount()
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    }
    const GetExtractoAccount = async () => {
        try {
            const response = await axios.get<Extracto[]>(`https://localhost:7222/api/Cuenta/extracto/${id}?year=${parseInt(year)}&month=${parseInt(month)}`);
            setMovement(response.data)
            console.log('Respuesta del servidor:', response.data);
            toast("Ultimos Movimientos")
            handleOpen()
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    }
    return (<>
        <Button onClick={GetAccount}>
            <Typography>Extracto</Typography>
        </Button>
        <Dialog onClose={handleClose} open={state}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5" color="#009aff" style={{ margin: 10, marginTop: 40 }}>
                    Extracto del mes
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    style={{ margin:10 }}
                    id="year"
                    name="year"
                    label="Year"
                    value={year}
                    onChange={handleChangeYear}>
                </TextField>
                
            </Grid>
            <Grid item xs={12}>
                <TextField
                    style={{ margin: 10 }}
                    id="month"
                    name="month"
                    label="Month"
                    value={month}
                    onChange={handleChangeMonth}>
                </TextField>
                
            </Grid>
            <Grid item xs={12}>
                <Button onClick={GetExtractoAccount} style={{ margin: 10 }}>Buscar</Button>
            </Grid>
            <Grid container spacing={2} style={{ width: "100%", padding: 20 }}>
                <Grid item xs={12}>
                    <Typography>{formData.name} {formData.lastName}</Typography>
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
                            {movement.map((move, index) => (
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
                <Grid item xs={12}>
                    <Button onClick={handleClose}
                        style={{ backgroundColor: "#ff3808", borderRadius: 10, marginLeft: 10 }}><Typography color="whitesmoke">Cerrar</Typography></Button>
                </Grid>
            </Grid>
        </Dialog>
    </>
    )
}
export default ExtractoAccount