import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, FormLayout, FormItem, FormLayoutGroup, Input, CellButton } from '@vkontakte/vkui';


const Auth = ({ id, go }) => {

	const [login, setLogin] = useState('');

	const [password, setPassword] = useState('');

	const Login = e => {
		console.log(login);
		console.log(password);
	}

	return(
	<Panel id={id}>
		<PanelHeader>Авторизация</PanelHeader>

		<Group header={<Header mode="primary">Вход в приложение</Header>}>
			
			<FormLayout>
				<FormLayoutGroup mode="vertical">
					<FormItem top="Логин">
						<Input onChange={e => setLogin(e.target.value)}
						value = {login}/>
					</FormItem>
					<FormItem top="Пароль">
						<Input onChange={e => setPassword(e.target.value)}
						value = {password}/>
					</FormItem>
				</FormLayoutGroup>
			</FormLayout>

			<CellButton onClick={e => Login(e)}>Войти</CellButton>
			<CellButton onClick={BecomeAClient}>Стать клиентом</CellButton>


		</Group>
	</Panel>)
};



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
