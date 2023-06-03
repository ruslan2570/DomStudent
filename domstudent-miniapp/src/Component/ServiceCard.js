import react, { useState } from 'react';

import { Panel, Header, Group, RichCell, Button, ButtonGroup } from '@vkontakte/vkui';
import { Icon24MoneyCircleOutline } from '@vkontakte/icons';

const ServiceCard = ({service}) => {

    const [appearance, setAppearance] = useState('accept');
    const [onClick, setOnclick] = useState(null);
    const [btnText, setBtnText] = useState('кнопка');

    const disable = (e) => {

    }

    const enable = (e) => {

    }

    if(service.isEnabled){
        setAppearance('negative');
        setOnclick(disable);
        setBtnText('Отключить');
    } else{
        setAppearance('positive');
        setOnclick(enable);
        setBtnText('Подключить');
    }

    


    return (
        <Group>
            <RichCell
                text={service.name}
                caption={service.price + " рублей"}
                actions={
                    <ButtonGroup mode="horizontal" gap="s" stretched>
                        <Button appearance={appearance} onClick={onClick} after={<Icon24MoneyCircleOutline></Icon24MoneyCircleOutline>} size="s">
                            {btnText}
                        </Button>
                    </ButtonGroup>
                }
                disabled>
            </RichCell>
        </Group>)
}

export default ServiceCard;