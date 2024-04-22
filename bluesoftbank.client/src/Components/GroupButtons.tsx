import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditAccount from './EditAccount';
import DeleteAccount from './DeleteAccount';
import DetailsAccount from './DetailstAccount';
import ConsignarAccount from './Consignar';
import RetirarAccount from './Retirar';
import LastMovementAccount from './LastMovement';

const BasicMenu: React.FC<{ id: string, isAhorro: boolean }> = ({ id, isAhorro }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ textAlign:"center" }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Opciones
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <ConsignarAccount id={id} />
                </MenuItem>
                <MenuItem>
                    <RetirarAccount id={id} />
                </MenuItem>
                {isAhorro ? (
                    <MenuItem>
                        <LastMovementAccount id={id} />
                    </MenuItem>): (<></>) }
                <MenuItem>
                    <EditAccount id={id} />
                </MenuItem>
                <MenuItem>
                    <DeleteAccount id={ id} />
                </MenuItem>
                <MenuItem>
                    <DetailsAccount id={ id} />
                </MenuItem>
            </Menu>
        </div>
    );
}
export default BasicMenu