export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/Authors/NavToAuthors_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/NavToAuthors_Edit.action');
    }
}