import { TestScheduler } from 'jest';

test('display user name for user', () => {
    const user = {name: 'Ryan', email: 'ryan@test.com'};
    const name = user ? ' ' + user.name: ' Guest';
    expect(name).toEqual(' Ryan');
});

test('display guest if user null', () => {
    const user = null;
    const name = user ? ' ' + user.name: ' Guest';
    expect(name).toEqual(' Guest');
});

test('display page label for user', () => {
    const page = 0;
    const meds = [
        {id: 1, name: 'Acetamenophen', price: 150},
        {id: 2, name: 'Ibuprofen', price: 250}
    ];
    const pageLabel = `${page * 15 + 1}-${(page + 1) * 15} of ${meds.length}`;
    expect(pageLabel).toEqual('1-15 of 2');
});

test('hide page label if user null', () => {
    const user = null;
    const page = 0;
    const meds = [
        {id: 1, name: 'Acetamenophen', price: 150},
        {id: 2, name: 'Ibuprofen', price: 250}
    ];
    const pageLabel = user && `${page * 15 + 1}-${(page + 1) * 15} of ${user.meds.length}`;
    expect(pageLabel).toBeNull();
});
