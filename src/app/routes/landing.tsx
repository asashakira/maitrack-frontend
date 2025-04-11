import {Search} from '@mui/icons-material'
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'

const LandingRoute = () => {
    const navigate = useNavigate()

    const [maiID, setMaiID] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaiID(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: search like opgg
        // also make search page
        const [gameName, tagLine] = maiID.replace(/\s+/g, '').split('#')
        navigate(`/users/${gameName}-${tagLine}`)
    }

    return (
        <ContentLayout>
            <Box sx={{pt: 15, pb: 15}}>
                <Typography
                    variant="h1"
                    noWrap
                    sx={{
                        color: 'inherit',
                        cursor: 'default',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        textDecoration: 'none',
                    }}
                >
                    MAITRACK
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{width: 800}}>
                <TextField
                    variant="outlined"
                    placeholder="GameName + #TagLine"
                    value={maiID}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="search"
                                        disableRipple
                                        type="submit"
                                    >
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
        </ContentLayout>
    )
}

export default LandingRoute
