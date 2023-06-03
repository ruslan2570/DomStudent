import react from 'react';

import { Panel, Header, Group, Cell, Div, Avatar, View, SimpleCell, InfoRow } from '@vkontakte/vkui';

const Main = ({id, fetchedUser, user}) => {

    return(
        <View id={id} activePanel={id}>
        <Panel id={id}>

            {fetchedUser &&
                <Group header={<Header mode="secondary">Данные профиля</Header>}>
                    <Cell
                        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
                        subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                    >
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </Cell>
                </Group>}

            <Group header={<Header mode="secondary">Информация по договору</Header>}>

                <Div>
                    <SimpleCell>
                        <InfoRow header="Логин">{user.login}</InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="№ договора">{user.vkid}</InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Адрес">{user.address}</InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Стоимость услуг">{user.sum + " ₽"}</InfoRow>
                    </SimpleCell>
                </Div>
            </Group>
        </Panel>
    </View>

    )
}

export default Main;