import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;
const API = 'https://jsonplaceholder.typicode.com';

describe(`# ${API}/posts`, () => {
  it('should return the expected data type', function(done) {
    chai.request(API)
      .get('/posts')
      .end((err, res) => {
        res.body.forEach(data => {
          const userId = data.userId;
          const id = data.id;
          const title = data.title;
          const body = data.body;

          expect(userId).to.be.a('number');
          expect(id).to.be.a('number');
          expect(title).to.be.a('string');
          expect(body).to.be.a('string');
        })
        
        done();
      });
  })

  it('should return the same data as the input', function(done) {
    const userId = 1;
    const id = 7;
    const title = "magnam facilis autem";
    const body = "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas";

    chai.request(API)
      .get('/posts')
      .query({
        id: id,
        userId: userId,
        title: title,
        body: body
      })
      .end((err, res) => {
        const firstData = res.body[0] ?? {};

        expect(firstData.userId).to.equal(userId);
        expect(firstData.id).to.equal(id);
        expect(firstData.title).to.equal(title);
        expect(firstData.body).to.equal(body);

        done();
      });
  })
})

