import { Grid, Typography } from '@mui/material';
import './App.css';
import AhorroPage from './Components/ahorro';
import CorrientePage from './Components/corriente';
import TabsPage from './Components/Tabs';

function App() {
    return (
        <div className="Container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontFamily="times-new-roman"
                        color={"#009aff" }>
                        Bluesoft Bank
                    </Typography>
                </Grid>
                <Grid textAlign="left" item xs={6}>
                    <CorrientePage />
                    <AhorroPage />
                </Grid>
                <Grid item xs={12}>
                    <TabsPage/>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default App;