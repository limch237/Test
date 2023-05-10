export default function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Books/Books_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/Books_CreateEntity.action');
    }
}