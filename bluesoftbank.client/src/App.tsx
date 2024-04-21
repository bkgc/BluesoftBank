import { Button, Grid, Typography } from '@mui/material';
import './App.css';
import AhorroPage from './Components/ahorro';

function App() {
    return (
        <div className="Container">
            <Grid container spacing={2}
                style={{ borderRadius: 15, backgroundColor:"#fff7bd" }}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontFamily="times-new-roman"
                        color={"#95cfb7" }>
                        Bluesoft Bank
                    </Typography>
                </Grid>
                <Grid textAlign="left" item xs={12}>
                    <AhorroPage />
                    <Button>Crear Cuenta para empresa</Button>
                    

                </Grid>
            </Grid>
            
        </div>
    );
}

export default App;