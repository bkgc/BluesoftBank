import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react"
const AhorroPage = () => {
    const [state, setState] = useState<boolean>(false);
    const handleOpen = () => {
        setState(true)
    }
    const handleClose = () => {
        setState(false)
    }
    return (
        <>
            <Button onClick={handleOpen}
                style={{ backgroundColor: "#95cfb7", borderRadius: 10 }}>
                <Typography color="#fff7bd">
                Crear cuenta de ahorro
                </Typography>
            </Button>
            <Dialog onClose={handleClose} open={state}>
                <Grid container spacing={2} style={{ width: "100%", padding:20 }}>
                    <Grid item xs={12}>
                        <Typography color="#95cfb7" textAlign="center" variant="h5" fontFamily="times-new-roman">Nueva Cuenta de Ahorro</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Nombres">
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Apellidos">
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Ci">
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Domicilio">
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{ backgroundColor: "#95cfb7", borderRadius: 10 }}><Typography color="#fff7bd">Aceptar</Typography></Button>
                        <Button onClick={handleClose}
                            style={{ backgroundColor: "#f04155", borderRadius: 10, marginLeft: 10 }}><Typography color="#fff7bd">Cancelar</Typography></Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>)
}
export default AhorroPage