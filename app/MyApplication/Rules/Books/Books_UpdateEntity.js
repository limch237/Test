export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Books/Books_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/Books_UpdateEntity.action');
    }
}