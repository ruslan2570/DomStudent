import react from 'react';

import { Panel, Header, Group, Cell, Div, Avatar, View, SimpleCell, InfoRow, CellButton, Alert } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

const Logout = ({ id, setPopout, closePopout, serverUrl, fetchedUser, setActivePanel }) => {

    const close = () => bridge.send('VKWebAppClose', { status: 'success' });

    const logout = () => {
        setPopout(
            <Alert
                actions={[
                    {
                        title: 'Выход',
                        mode: 'destructive',
                        autoClose: true,
                        action: fetchLogout,
                    },
                    {
                        title: 'Отмена',
                        autoClose: true,
                        mode: 'cancel',
                    },
                ]}
                actionsLayout="vertical"
                onClose={closePopout}
                header="Выйти"
                text="Вы уверены, что хотите выйти?"
            />,
        );
    };

    const fetchLogout = () => {

		var requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		};

		fetch(serverUrl + "user/" + fetchedUser.id, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));

		setActivePanel('auth');
	};

    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                <Group>
                    <CellButton onClick={close}>Выйти из приложения</CellButton>
                    <CellButton mode='danger' onClick={logout}>Выйти</CellButton>
                </Group>
            </Panel>
        </View>
    )
}

export default Logout;