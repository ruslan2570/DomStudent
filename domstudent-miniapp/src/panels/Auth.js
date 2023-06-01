import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, FormLayout, FormItem, FormLayoutGroup, Input, CellButton } from '@vkontakte/vkui';

const Auth = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>Авторизация</PanelHeader>

		<Group header={<Header mode="primary">Вход в приложение</Header>}>
			
			<FormLayout>
				<FormLayoutGroup mode="vertical">
					<FormItem top="Имя">
						<Input />
					</FormItem>
					<FormItem top="Фамилия">
						<Input />
					</FormItem>
				</FormLayoutGroup>

				<FormLayoutGroup mode="horizontal" segmented>
					<FormItem top="Имя ящика">
						<Input />
					</FormItem>
				</FormLayoutGroup>
			</FormLayout>

			<CellButton onClick={Login}>Войти</CellButton>
			<CellButton onClick={BecomeAClient}>Стать клиентом</CellButton>


		</Group>
	</Panel>
);

const Login = () => {

}

const BecomeAClient = () => {
	bridge.send('VKWebAppOpenWallPost', {
		owner_id: -220910322,
		post_id: 4
		})
}

Auth.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Auth;
