using { Test as my } from '../db/schema';

using Test from '../db/schema';

@path : 'service/Test'
service TestService
{
    entity Books as
        projection on my.Books;

    entity Authors as
        projection on my.Authors;
}

annotate TestService with @requires :
[
    'authenticated-user'
];
