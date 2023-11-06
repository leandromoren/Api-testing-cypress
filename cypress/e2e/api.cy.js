describe("Backend testing", () => {

    it('01 - Get call', () => {
        cy.request('https://jsonplaceholder.typicode.com/comments').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.length(500);
            expect(response).to.have.property('headers');
            expect(response).to.have.property('duration');
        })
    });

    it('02 - Post call', () => {
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts/',
            body: {
                title:"Test post",
                body:"This is post call",
                userId:1
            },
            header: {
                "content-type":"application/json; charset=utf-8"
            }
        })
        .its('status')
        .should('eq', 201);
    });

    it('03 - Put Call', () => {
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
                userId: 1,
                id: 1,
                title: "Test put",
                body: "This is a put call"
            }
        })
        .then((response) => {
            cy.log(response.body.body);
            expect(response.body.body).to.eql("This is a put call")
            expect(response.status).to.eq(200);
        })
    });
})