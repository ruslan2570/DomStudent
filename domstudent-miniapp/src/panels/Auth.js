import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, FormLayout, FormItem, FormLayoutGroup, Input, CellButton } from '@vkontakte/vkui';


const Auth = ({ id, go }) => {

	const [login, setLogin] = useState('');

	const [password, setPassword] = useState('');



	const Login = e => {
		console.log({ login, password });
		fetchData();
	}

	const fetchData = async () => {
		var formdata = new FormData();
		formdata.append("login", login);
		formdata.append("password", password);
		formdata.append("vkid", "1411");

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		};

		const response = await fetch("http://new-bokino.ru:49178/api/v1/user/auth", requestOptions)

			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}



	return (
		<Panel id={id}>
			<PanelHeader>Авторизация</PanelHeader>

			<Group header={<Header mode="primary">Вход в приложение</Header>}>

				<FormLayout>
					<FormLayoutGroup mode="vertical">
						<FormItem top="Логин">
							<Input onChange={e => setLogin(e.target.value)}
								value={login} />

						</FormItem>
						<FormItem top="Пароль">
							<Input onChange={e => setPassword(e.target.value)}
								value={password} />
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
