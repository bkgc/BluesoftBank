import {    Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import axios from "axios";
import {  useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import BasicMenu from "./GroupButtons";
interface Cuenta {
    id: string;
    tipo: string;
    saldo: number;
    city: string;
    name: string;
    lastName: string;
    email: string;
}
const GetAllCuentasPage = () => {
    const [cuentas, setCuentas] = useState < Cuenta[]>([]);
    const GetAllAccount = async () => {
        try {
            const response = await axios.get<Cuenta[]>('https://localhost:7222/api/Cuenta');
            setCuentas(response.data)
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast.error('errror en la solicitud')
        }
    };
    useEffect(() => {
        GetAllAccount()
    },[])
    return (
        <>
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center">
                        Cuentas
                    </Typography>
                </Grid>
                <Grid item xs={ 12}>
                    {cuentas.length === 0 ? (
                        <Typography align="center">Cargando...</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Saldo</TableCell>
                                    <TableCell>Ciudad</TableCell>
                                    <TableCell>Nombres</TableCell>
                                        <TableCell>Apellidos</TableCell>
                                        <TableCell>
                                            <Typography align="center">
                                                Opciones
                                            </Typography>
                                        </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cuentas.map((cuenta) => (
                                    <TableRow key={cuenta.id}>
                                        <TableCell>{cuenta.tipo}</TableCell>
                                        <TableCell>{cuenta.saldo}</TableCell>
                                        <TableCell>{cuenta.city}</TableCell>
                                        <TableCell>{cuenta.name}</TableCell>
                                        <TableCell>{cuenta.lastName}</TableCell>
                                        <TableCell>
                                            <BasicMenu id={cuenta.id} isAhorro={cuenta.tipo=="ahorro"?true:false} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Grid>
            </Grid>
        </>)
}
export default GetAllCuentasPage