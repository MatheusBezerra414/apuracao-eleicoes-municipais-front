import { SetStateAction, useEffect, useState } from 'react';
import { apiService } from '../api';
import { useNavigate } from 'react-router-dom';
import { CandidatosData } from '../interfaces/candidatos.inferface';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// 

export default function TabelaCandidatos(){

    const [candidatos, setCandidatos] = useState<CandidatosData[]>([]);
    const [isEditableTable, setisEditableTable] = useState(false)
    const [searchTable, setSearchTable] = useState("")
    const navigate = useNavigate();

    const [candidatoid, setCandidatoid] = useState<String>(" ")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function toggleEdition(){
        setisEditableTable(!isEditableTable)
    }

    const handleEdit = (candidatoid: string) => {
    handleClose();
    navigate(`/edit/${candidatoid}`); // Substitua por sua rota de edição real
  };

    const rows = 
        candidatos.map((candidato, index) => { 
            return {
                id: index + 1 ,
                _id: candidato._id, 
                nome: candidato.nome,
                numero: candidato.numero,
                cargo: candidato.cargo,
                sexo: candidato.sexo,
                uf: candidato.origem.uf,
                cidade: candidato.origem.cidade,
                regiao: candidato.origem.regiao,
                isEleito: candidato.isEleito,

            }
        })
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', width: 20, hideable: true, disableColumnMenu: true},
        { field: 'nome', headerName: 'Nome', width: 130, disableColumnMenu: true },
        { field: 'numero', headerName: 'Número', width: 130 ,disableColumnMenu: true },
        { field: 'cargo', headerName: 'Cargo', width: 130, disableColumnMenu: true },
        { field: 'sexo', headerName: 'Sexo', width: 130, disableColumnMenu: true },
        { field: 'uf', headerName: 'UF', width: 60, disableColumnMenu: true },
        { field: 'cidade', headerName: 'Cidade', width: 130, disableColumnMenu: true },
        { field: 'regiao', headerName: 'Região', width: 130, disableColumnMenu: true },
        { field: 'status', headerName: 'Eleito', width: 80, disableColumnMenu: true, 
            renderCell: (params) => {
                return params.row.isEleito
                    ? <Chip label="Sim" color="success" variant="outlined" />
                    : <Chip label="Não" color="error" variant="filled" />; }},
        { field: 'more', headerName: '', width: 30, disableColumnMenu: true,
            renderCell: (params) => { 
                const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                     handleClick(event);
                };
                return  <div>
                            <IconButton
                                aria-label="mais opções"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => {handleClick(e)}}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '10ch',
                                },
                                }}
                            >
                                <MenuItem onClick={ () => handleEdit(params.row._id) }>
                                    <EditIcon style={{ marginRight: 5 }} /> Editar
                                </MenuItem>
                            </Menu>
                        </div> } },
        
    ];

    useEffect(() => {
        const buscarCandidatos = async () => {
            try {
                const listaCandidatos = await apiService.findAll()
                setCandidatos(listaCandidatos.data)
            } catch (err) {
                console.error('erro ao buscar candidatos: ', err)
            }
        }
        buscarCandidatos()
    }, [] )

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </>
    )
}
