import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Epic, Alert, Tabbar, TabbarItem, Badge, View, Placeholder } from '@vkontakte/vkui';
import { Icon28NewsfeedOutline, Icon28ServicesOutline, Icon28MessageOutline, Icon28ClipOutline, Icon28UserCircleOutline} from '@vkontakte/icons';


const Home = ({ id, go, fetchedUser }) => {

	const [panelHeader, setPanelHeader] = useState('Личный кабинет');
	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story);
		setPanelHeader(e.currentTarget.text);
	}
	const [activeStory, setActiveStory] = useState('main');


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
								<Icon28MessageOutline />
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
				<View id="main" activePanel="main">
					<Panel id="main">

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
								Здесь будет информация
							</Div>
						</Group>
					</Panel>
				</View>
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
							<Placeholder icon={<Icon28MessageOutline width={56} height={56} />}></Placeholder>
						</Group>
					</Panel>
				</View>
				<View id="logout" activePanel="logout">
					<Panel id="logout">
						<Group style={{ height: '1000px' }}>
							<Placeholder icon={<Icon28ClipOutline width={56} height={56} />}></Placeholder>
						</Group>
					</Panel>
				</View>
			</Epic>

		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
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
