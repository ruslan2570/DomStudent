import react from 'react';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Epic, Alert, Tabbar, TabbarItem, Badge, View, Placeholder, CellButton, SimpleCell, InfoRow } from '@vkontakte/vkui';
import { Icon24NotificationOutline } from '@vkontakte/icons';

const Notifications = ({ id, servicesList, user }) => {


    console.log(servicesList);

    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <Group>
                    <Placeholder icon={<Icon24NotificationOutline width={56} height={56} />}>Раздел находится в разработке</Placeholder>
                </Group>
            </Panel>
        </View>

    )
}

export default Notifications;