import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Auth from './panels/Auth';

const App = () => {
	const [activePanel, setActivePanel] = useState('auth');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const serverUrl = 'https://dss.new-bokino.ru/api/v1/'; 
	const goTo = (panel) => {	
		setActivePanel(panel);
		bridge.send('VKWebAppTapticImpactOccurred', {style: 'heavy'});
	}


	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			var requestOptions = {
				method: 'GET',
				redirect: 'follow'
			  };
			  
			  fetch(serverUrl + 'user/' + user.id, requestOptions)
			  .then(response => response.status == 200 ? goTo('home') : goTo('auth'));
			setPopout(null);
		}
		fetchData();
	}, []);

	


	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser}  serverUrl={serverUrl} setPopout={setPopout} setActivePanel={goTo}/>
								<Auth id='auth' fetchedUser={fetchedUser}  serverUrl={serverUrl} setPopout={setPopout} setActivePanel={goTo}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
