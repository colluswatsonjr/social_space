
import { Typography } from '@mui/material';


const SpaceSubscribes = ({ subs }) => {
    return (
        <Typography variant="body2" component="p">
        {subs.length} subscribers
        </Typography>
    );
}

export default SpaceSubscribes;