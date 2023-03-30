
import { useNavigate } from "react-router";

import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const Explore = ({ spaces, users }) => {

    let navigate = useNavigate()

    return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Box sx={{ marginTop: 8 }}>
                    {spaces ? spaces.map((space) => {
                        return (
                            <Grid item key={space.id}>
                                <Card sx={{ minWidth: 200 }} onClick={() => navigate(`/space/${space.title}`)}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                            {space.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 20,maxWidth: '90%', height: 'auto' }} variant="body2">
                                            {space.bio}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }) : null}
                </Box>
                <Box sx={{  marginTop: 8}}>
                    {users ? users.map((user) => {
                        return (
                            <Grid item key={user.id}>
                                <Card sx={{ minWidth: 200 }} onClick={() => navigate(`/user/${user.username}`)}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                                            {user.username}
                                        </Typography>
                                        <Typography sx={{ fontSize: 20,maxWidth: '90%', height: 'auto' }} variant="body2">
                                            {user.bio}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }) : null}
                </Box>
            </Grid>
    );
}

export default Explore;