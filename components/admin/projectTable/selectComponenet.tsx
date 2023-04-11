import { Select } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { Gsg } from 'services/api/types/Gsg';

interface Props {
    project: Gsg;
    handleStatus: (id: number, e: ChangeEvent) => void;
}
const SelectComponent = ({ project, handleStatus }: Props) => {
    return (
        <Select
            w="163px"
            onChange={(e) => handleStatus(project?.id, e)}
            defaultValue={project.status}
            variant="outline"
            _focus={{ color: 'white' }}
        >
            <option value="in-review">En revisión</option>
            <option value="sketch">Borrador</option>
            <option value="published">Publicado</option>
            <option value="canceled">Finalizado</option>
        </Select>
    );
};

export default SelectComponent;
