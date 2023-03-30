
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const Home = () => {
    const { user } = useContext(UserContext);
    console.log(user)
    return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Box sx={{ marginTop: 8 }}>

                </Box>
            </Grid>
    );
}

export default Home;