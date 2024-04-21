import { Grid, Typography } from '@mui/material';
import './App.css';
import AhorroPage from './Components/ahorro';
import CorrientePage from './Components/corriente';
import GetAllCuentasPage from './Components/getCuentas';

function App() {
    return (
        <div className="Container">
            <Grid container spacing={2}
                style={{ borderRadius: 15, backgroundColor:"#fff7bd" }}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontFamily="times-new-roman"
                        color={"#009aff" }>
                        Bluesoft Bank
                    </Typography>
                </Grid>
                <Grid textAlign="left" item xs={6}>
                    <CorrientePage />
                </Grid>
                <Grid textAlign="right" item xs={6}>
                    <AhorroPage />
                </Grid>
                <Grid item xs={ 12}>
                    <GetAllCuentasPage />
                </Grid>
            </Grid>
            
        </div>
    );
}

export default App;