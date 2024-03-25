const URL_BASE = "https://reqres.in";

describe('Api testing on reqres', () => {

    function generateRandomName() {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const name = Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        return name;
    }
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

    it('02 - Get single user', () => {
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

    it('Different method', () => {
        cy.fixture('users').then((data) => {
            data.name = generateRandomName();
            cy.request('POST', `${URL_BASE}/api/users`, data)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).has.property('name', data.name)
                expect(response.body).has.property('job', 'QA tester')
                expect(response.body.name).to.eq(data.name)
                expect(response.body.job).to.eq('QA tester')
                expect(response.body.id).to.not.be.null
            });
        });
    });

    it('05 - Post Create user', () => {
        cy.fixture('users').then((data) => {
            data.name = generateRandomName();
            cy.request({
                method: 'POST',
                url: `${URL_BASE}/api/users`,
                body: data
            })
            .then((response) => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body).has.property('name', data.name)
                expect(response.body).has.property('job', 'QA tester')
                expect(response.body.name).to.eq(data.name)
                expect(response.body.job).to.eq('QA tester')
                expect(response.body.id).to.not.be.null

                // cy.request({
                //     method: 'GET',
                //     // La api deberia retornar el id del usuario creado pero reqres dice que lo crea y en realidad no lo guarda en ningun lado entonces falla
                //     url: `${URL_BASE}/api/users/${response.body.id}`, 
                // })
                // .then((response) => {
                //     expect(response.status).to.eq(200)
                //     expect(response.body).has.property('name', data.name)
                //     expect(response.body).has.property('job', 'QA tester')
                //     expect(response.body.name).to.eq(data.name)
                //     expect(response.body.job).to.eq('QA tester')
                //     expect(response.body.id).to.not.be.null
                // })
            });
        })
    });
});  