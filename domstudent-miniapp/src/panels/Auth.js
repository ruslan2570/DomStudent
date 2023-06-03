import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';


import { Panel, PanelHeader, Header, Button, Group, Cell, Div, 
	Avatar, FormLayout, FormItem, FormLayoutGroup, Input, CellButton, Alert,
	usePlatform, Platform } from '@vkontakte/vkui';


const Auth = ({ id, serverUrl, setPopout, setActivePanel, fetchedUser }) => {

	const platform = usePlatform();
	const isVKCOM = platform == Platform.VKCOM;

	const [login, setLogin] = useState('');

	const [password, setPassword] = useState('');

	const [vkid, setVkid] = useState('');

	const toLogin = e => {
		setVkid(fetchedUser.id);
		fetchData();
		//  bridge.send('VKWebAppGetUserInfo', {})
		// 	.then((data) => {
		// 		if (data.id) {
		// 			setVkid(data.id);
		// 			console.log({ login, password, vkid });
		// 			fetchData();
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
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

				<CellButton onClick={e => toLogin(e)}>Войти</CellButton>
				{isVKCOM && (

					<CellButton onClick={becomeAClient}>Стать клиентом</CellButton>
				)}

			</Group>
		</Panel>)
};

const becomeAClient = () => {
	bridge.send('VKWebAppOpenWallPost', {
		owner_id: -220910322,
		post_id: 4
	})
}

Auth.propTypes = {
	id: PropTypes.string.isRequired,
	serverUrl: PropTypes.string.isRequired,
	setPopout: PropTypes.func.isRequired,
	setActivePanel: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	})
};

export default Auth;