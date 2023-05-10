export default function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action');
    }
}