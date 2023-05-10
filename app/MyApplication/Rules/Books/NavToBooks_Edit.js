export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Books'
                },
                'OnSuccess': '/MyApplication/Actions/Books/NavToBooks_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/NavToBooks_Edit.action');
    }
}