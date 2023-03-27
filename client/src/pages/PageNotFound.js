import { Link } from "react-router-dom"

import {Box} from '@mui/material'


const PageNotFound = () => {
    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            PageNotFound
            <Link to='/'>Go Back Home</Link>
        </Box>
    );
}

export default PageNotFound;