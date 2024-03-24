const URL_BASE = "https://reqres.in";

describe('Api testing', () => {

    beforeEach(() => {
        
    });

    it('01 - Get all users', () => {
        cy.request({
            method: 'GET',
            url: `${URL_BASE}/api/users`,
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200);
        })
    });

    it('02 = Get single user', () => {
        cy.request({
            method: 'GET',
            url: `${URL_BASE}/api/users/7`,
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.equal(7);
        });
    });
});