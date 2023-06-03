
import react, {useEffect, useState} from 'react';

import { Panel, Div, View } from '@vkontakte/vkui';
import ServiceCard from '../Component/ServiceCard';

const Services = ({ id, user, serverUrl }) => {


    const [servicesList, setServicesList] = useState(null);

    const fetchAllServices = async () => {
        var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};

		const servicesResponse = await fetch(serverUrl + "service", requestOptions);
		const servicesResult = await servicesResponse.json();
		return servicesResult;
    }

    const fetchServicesList = async () => {
        const services = await fetchAllServices();
        services.forEach(e => {
            e.userList.forEach(u => {
                if(u.vkid == user.vkid){
                    e.isEnabled = true;
                    return;
                }
                e.isEnabled = false;
            });
        })
        console.log(services);
        setServicesList(services);
    }

    useEffect(() => {
        fetchServicesList();
    }, []);



    return (
        <View id={id} activePanel={id}>
            <Panel id={id}>
                {servicesList !=null && servicesList.map(
                    service =>
                    <ServiceCard service={service} key={service.id}></ServiceCard>
                )}
            </Panel>
        </View>
    )
}

export default Services;