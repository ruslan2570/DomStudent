import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Epic, Alert, Tabbar, TabbarItem, Badge, View, Placeholder, CellButton, SimpleCell, InfoRow } from '@vkontakte/vkui';
import { Icon28NewsfeedOutline, Icon28ServicesOutline, Icon24NotificationOutline, Icon28UserCircleOutline } from '@vkontakte/icons';

import Main from './Main';

const Home = ({ id, fetchedUser, serverUrl, setPopout, setActivePanel }) => {

	const [panelHeader, setPanelHeader] = useState('Главная');
	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story);
		setPanelHeader(e.currentTarget.textContent);
	}
	const [activeStory, setActiveStory] = useState('main');

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

	const closePopout = () => {
		setPopout(null);
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

		console.log(serverUrl);
	}
	const [user, setUser] = useState(null);
	const [servicesList, setServicesList] = useState(null);

	console.log("home: ");
	console.log(fetchedUser);
	console.log(user);

	useEffect(
		() => {
			const fetchUser = async () => {

				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(serverUrl + "user/" + fetchedUser.id, requestOptions)
					.then(response => response.json())
					.then(result => {
						setUser(result);
					})
					.catch(error => console.log('error', error));

				requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(serverUrl + "service/" + fetchedUser.id, requestOptions)
					.then(response => response.json())
					.then(result => {
						setServicesList(result)
						console.log("услуги");
						console.log(user);
						if (user != null) {
							let userWithSum = user;
							const sum = servicesList.array.reduce((accumulator, obj) => accumulator + obj.value, 0);
							console.log(sum);
							userWithSum.sum = sum;
							setUser(userWithSum);
						}
					})
					.catch(error => console.log('error', error));
			}
			fetchUser();
		}, []
	);

	return (
		<Panel id={id}>
			<PanelHeader>{panelHeader}</PanelHeader>

			<Epic
				activeStory={activeStory}
				tabbar={

					<Tabbar>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'main'}
							data-story="main"
							text="Главная"
						>
							<Icon28NewsfeedOutline />
						</TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'services'}
							data-story="services"
							text="Услуги"
						>
							<Icon28ServicesOutline />
						</TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'notifications'}
							data-story="notifications"
							text="Уведомления"
						>
							<Icon24NotificationOutline />
						</TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'logout'}
							data-story="logout"
							text="Выход"
						>
							<Icon28UserCircleOutline />
						</TabbarItem>
					</Tabbar>
				}
			>
				{user != null &&
					<Main id="main" fetchedUser={fetchedUser} user={user}></Main>
				}

				<View id="services" activePanel="services">
					<Panel id="services">
						<Group style={{ height: '1000px' }}>
							<Placeholder icon={<Icon28ServicesOutline width={56} height={56} />}></Placeholder>
						</Group>
					</Panel>
				</View>
				<View id="notifications" activePanel="notifications">
					<Panel id="notifications">
						<Group style={{ height: '1000px' }}>
							<Placeholder icon={<Icon24NotificationOutline width={56} height={56} />}></Placeholder>
						</Group>
					</Panel>
				</View>
				<View id="logout" activePanel="logout">
					<Panel id="logout">
						<Group style={{ height: '1000px' }}>
							<CellButton onClick={close}>Выйти из приложения</CellButton>
							<CellButton mode='danger' onClick={logout}>Выйти</CellButton>
						</Group>
					</Panel>
				</View>
			</Epic>

		</Panel>
	)
};

Home.propTypes = {
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
	}),
};

export default Home;
