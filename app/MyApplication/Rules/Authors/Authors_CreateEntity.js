export default function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Authors/Authors_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/Authors_CreateEntity.action');
    }
}