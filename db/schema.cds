namespace Test;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal
}
from '@sap/cds/common';

entity Books
{
    key ID : UUID
        @Core.Computed;
    Name : String(100);
    authors : Association to one Authors;
}

entity Authors
{
    key ID : UUID
        @Core.Computed;
    Name : String(100);
    books : Association to many Books on books.authors = $self;
}
