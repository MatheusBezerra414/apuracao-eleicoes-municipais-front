import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function PageTabela(){

    return(
        <>
            <Container>
                <h1 className="App">Lista de Candidatos</h1>
                <Outlet/>       
            </Container>
        </>
    )

}