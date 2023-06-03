import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Epic, Alert, Tabbar, TabbarItem, Badge, View, Placeholder, CellButton, SimpleCell, InfoRow } from '@vkontakte/vkui';
import { Icon28NewsfeedOutline, Icon28ServicesOutline, Icon24NotificationOutline, Icon28UserCircleOutline } from '@vkontakte/icons';

import Main from './Main';
import Services from './Services';
import Notifications from './Notifications';
import Logout from './Logout';

const Home = ({ id, fetchedUser, serverUrl, setPopout, setActivePanel }) => {

	const [panelHeader, setPanelHeader] = useState('Главная');
	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story);
		setPanelHeader(e.currentTarget.textContent);
	}
	const [activeStory, setActiveStory] = useState('main');

	const closePopout = () => {
		setPopout(null);
	};
	
	const [user, setUser] = useState(null);
	const [servicesList, setServicesList] = useState(null);


	useEffect(
		() => {
			const fetchUser = async () => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				const userResponse = await fetch(serverUrl + "user/" + fetchedUser.id, requestOptions);
				const userResult = await userResponse.json();
				setUser(userResult);

				const serviceResponse = await fetch(serverUrl + "service/" + fetchedUser.id, requestOptions);
				const serviceResult = await serviceResponse.json();
				setServicesList(serviceResult);


				if (userResult != null) {
					let userWithSum = { ...userResult };
					const sum = serviceResult.reduce((accumulator, obj) => accumulator + obj.price, 0);
					userWithSum.sum = sum;
					setUser(userWithSum);
				}
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

				<Services id="services" servicesList={servicesList} user={user}></Services>


				<Notifications id="notifications"></Notifications>

				<Logout id="logout" setPopout={setPopout} closePopout={closePopout} serverUrl={serverUrl} fetchedUser={fetchedUser} setActivePanel={setActivePanel}></Logout>
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
