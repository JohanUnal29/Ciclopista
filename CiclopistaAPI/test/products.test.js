import chai from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
const requester = supertest('http://127.0.0.1:5000');

//title, description, code(str), price(number), status(boolean), stock(number), category(str), subCategory(str), thumbnails(str)

describe('Testing products', () => {
    //quitar el check admin en app.js para test
    describe('Creación de productos', () => {
      it('En endpoint POST /api/products/addproduct debe crear productos', async () => {
        
        const productMock = {
          title: 'Llanta MTB CP rin 26 de taco',
          description: 'Llanta económica y confiable',
          code: '1098902',
          price: 20000,
          status: true,
          stock: 100,
          category: "Llantas",
          subCategory: "Llantas_26",
          thumbnails: "xxxdfdsewsawasdasd",
        };
  
        const response = await requester.post('/api/products/addproduct').send(productMock);
        const { status, ok, _body } = response;
  
        expect(ok).to.be.true;
      });
  
      it('En endpoint POST /api/products/addproduct no deberia crear productos con datos vacios', async () => {
        const productMock = {};
  
        const response = await requester.post('/api/products/addproduct').send(productMock);
        const { status, ok, _body } = response;
  
        expect(ok).to.be.eq(false);
      }); 
    }); 

    // describe('Consultar todos los productos', () => {
    //     it('GET /api/products/all', async () => {
    
    //       const response = await requester.get('/api/products/all');
    //       const { status, ok, _body } = response;
    
    //       console.log(_body.payload);
    //     }); 
    //   });

    //   describe('Consultar producto por categoria', () => {
    //     it('GET /api/products/:category', async () => {
    //       const category = 'Pachas'; 
          
    //       const response = await requester.get(`/api/products/${category}`);
    //       const { status, ok, _body } = response;
          
    //       console.log(_body.payload);
    //     }); 
    //   });
      
    //   describe('Consultar producto por ID', () => {
    //     it('GET /api/products/id/:id', async () => {
    //       const productId = '64fbfcea8672cdd671a53dbb'; 
          
    //       const response = await requester.get(`/api/products/id/${productId}`);
    //       const { status, ok, _body } = response;
          
    //       console.log(_body.payload);
    //     }); 
    //   });

    /* describe('Registro, Login and Current', () => {
      let cookieName;
      let cookieValue;
      const mockUser = {
        first_name: 'Maximo',
        last_name: 'Lorenzo',
        email: faker.internet.email(),
        password: '123',
      };
  
      it('Debe registrar un usuario', async () => {
        const { _body } = await requester.post('/api/sessions/register').send(mockUser);
        expect(_body.payload).to.be.ok;
      });
  
      it('Debe loggear un user y DEVOLVER UNA COOKIE', async () => {
        const result = await requester.post('/api/sessions/login').send({
          email: mockUser.email,
          password: mockUser.password,
        });
  
        const cookie = result.headers['set-cookie'][0];
        expect(cookie).to.be.ok;
  
        cookieName = cookie.split('=')[0];
        cookieValue = cookie.split('=')[1];
  
        expect(cookieName).to.be.ok.and.eql('coderCookie');
        expect(cookieValue).to.be.ok;
      });
  
      it('Enviar cookie para ver el contenido del user', async () => {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookieName}=${cookieValue}`]);
        expect(_body.payload.email).to.be.eql(mockUser.email);
      });
    }); */
    // describe('Test upload file', () => {
    //   it('Debe subir un archivo al crear pets', async () => {
    //     const petMock = {
    //       name: 'Firulais',
    //       specie: 'goat',
    //       birthDate: '10-10-2020',
    //     };
  
    //     const result = await requester.post('/api/pets/withimage').field('name', petMock.name).field('specie', petMock.specie).field('birthDate', petMock.birthDate).attach('image', './test/house.jpg');
  
    //     expect(result.status).to.be.eql(200);
    //     expect(result._body.payload).to.have.property('_id');
    //     expect(result._body.payload.image).to.be.ok;
    //   });
    // });
  });