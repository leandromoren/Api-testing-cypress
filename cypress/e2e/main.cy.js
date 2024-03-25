const URL_BASE = "https://reqres.in";

describe('Api testing on reqres', () => {

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
            url: `${URL_BASE}/api/users/7`
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.equal(7);
        });
    });

    it('03 - Get user invalid endpoint', () => {
        cy.request({
            method: 'GET',
            url: `${URL_BASE}/api/users/list/10`,
            failOnStatusCode: false // Para que no de error
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(404);
        });
    });

    it('04 - Get user not found', () => {
        cy.request({
            method: 'GET',
            url: `${URL_BASE}/api/users/23`,
            failOnStatusCode: false // Para que no de error
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(404);
        });
    });

    // --- POST METHODS ---

    it('05 - Post Create user', () => {
        cy.request({
            method: 'POST',
            url: `${URL_BASE}/api/users`,
            body: {
                name: 'nicole',
                job: 'Tecnica audiovisual'
            }
        })
        .then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body).has.property('name', 'nicole')
            expect(response.body).has.property('job', 'Tecnica audiovisual')
            expect(response.body.name).to.eq('nicole')
            expect(response.body.job).to.eq('Tecnica audiovisual')
            expect(response.body.id).to.not.be.null
        });
    });
});  