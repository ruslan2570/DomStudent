import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';


import { Panel, PanelHeader, Header, Button, Group, Cell, Div, 
	Avatar, FormLayout, FormItem, FormLayoutGroup, Input, CellButton, Alert,
	usePlatform, Platform } from '@vkontakte/vkui';


const Auth = ({ id, go, serverUrl, setPopout, setActivePanel }) => {

	const platform = usePlatform();
	const isVKCOM = platform !== Platform.VKCOM;

	const [login, setLogin] = useState('');

	const [password, setPassword] = useState('');

	const [vkid, setVkid] = useState('');

	const Login = e => {
		bridge.send('VKWebAppGetUserInfo', {})
			.then((data) => {
				if (data.id) {
					setVkid(data.id);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		console.log({ login, password, vkid });
		fetchData();
	}

	const fetchData = async () => {
		var formdata = new FormData();
		formdata.append("login", login);
		formdata.append("password", password);
		formdata.append("vkid", vkid);

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		};

		const closePopout = () => {
			setPopout(null);
		};

		const response = await fetch(serverUrl + 'user/auth', requestOptions)

			.then(response => {
				//response.text()
				if (response.status == 200)
					setActivePanel('home')
				else
					setPopout(
						<Alert
							actions={[
								{
									title: 'Понятно',
									autoClose: true,
									mode: 'default',
								},
							]}
							actionsLayout="vertical"
							onClose={closePopout}
							header="Ошибка"
							text="Неверные логин или пароль"
						/>,
					);

			})
			//.then(result => console.log(result))
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
				{isVKCOM && (

					<CellButton onClick={BecomeAClient}>Стать клиентом</CellButton>
				)}

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