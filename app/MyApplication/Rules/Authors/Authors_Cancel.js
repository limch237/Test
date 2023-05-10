export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/CloseModalPage_Cancel.action');
    }
}