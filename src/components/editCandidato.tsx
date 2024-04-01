import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../api';
import { CandidatosData } from '../interfaces/candidatos.inferface';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { Paper, Grid, TextField, Switch, styled, FormControlLabel, Skeleton, Typography } from '@mui/material';
import { FullscreenExitOutlined } from '@mui/icons-material';

export default function EditCandidato(){
    const [candidato, setCandidato] = useState<CandidatosData>();
    const {id} = useParams()

    const EleitoSwitch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            },
             '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.error.main))}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${encodeURIComponent(theme.palette.getContrastText(theme.palette.error.main))}"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>')`,
            right: 12,
        },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));
    const blue = {
        200: '#99CCFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0066CC',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Button = styled(BaseButton)(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: ${blue[500]};
        padding: 8px 16px;
        border-radius: 8px;
        color: white;
        transition: all 150ms ease;
        cursor: pointer;
        border: 1px solid ${blue[500]};
        box-shadow: 0 2px 1px ${
            theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
        }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

        &:hover {
            background-color: ${blue[600]};
        }

        &.${buttonClasses.active} {
            background-color: ${blue[700]};
            box-shadow: none;
            transform: scale(0.99);
        }

        &.${buttonClasses.focusVisible} {
            box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
            outline: none;
        }

        &.${buttonClasses.disabled} {
            background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
            color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
            border: 0;
            cursor: default;
            box-shadow: none;
            transform: scale(1);
        }
        `,
    );

    
    useEffect(() => {
        const buscarCandidatos = async () => {
            try {
                const candidatoByid = await apiService.findCandidatoById(id || "")
                setCandidato(candidatoByid.data)
            } catch (err) {
                console.error('erro ao buscar candidato: ', err)
            }
        }
        buscarCandidatos()
    }, [id] )


    return(
  
        <Grid container spacing={2}>
            <Grid item sm={4}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 5 }}>
                     <Grid container  alignItems="center" justifyContent="space-between">
                        <Grid item spacing={1} sm={10}>
                            <Typography variant="subtitle1" align="left" sx={{fontWeight: 700,}}> Status </Typography>
                            <Typography variant="subtitle2" align="left" gutterBottom>Candidato(a) foi eleito?</Typography>
                        </Grid>
                        <Grid item sm={2} justifyContent="flex-end">
                            <FormControlLabel label=" "control={<EleitoSwitch checked={candidato?.isEleito} />}/>
                        </Grid>     
                    </Grid>
                </Paper>
            </Grid>
            <Grid item sm={8}>              
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 5 }}>
                    <Grid container spacing={4}>
                    {!candidato ? (
                        Array.from(new Array(8)).map((_, index) => (
                            <Grid item xs={6} key={index}>
                                <Skeleton variant="rectangular" width="100%" height={56} animation="wave"/>
                            </Grid>
                        ))
                    
                    ) : (
                        <>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="nome" label='Nome Candidato' variant="outlined" defaultValue={candidato?.nome || ""} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="cargo" label="Cargo" defaultValue={candidato?.cargo} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="numero" label="Número" defaultValue={candidato?.numero} variant="outlined" placeholder=''/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="cidade" label="Cidade" defaultValue={candidato?.origem.cidade} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="regiao" label="Região" defaultValue={candidato?.origem.regiao} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="origem" label="Origem" defaultValue={candidato?.origem.uf} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="sexo" label="Sexo" defaultValue={candidato?.sexo} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={{width: "100%"}} id="votos" label="Votos" defaultValue={candidato?.votos} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} justifyContent="flex-end" sx={{display: "flex"}}>
                            <Button>Salvar alterações</Button>
                        </Grid>
                        </>

                    )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )

    
}