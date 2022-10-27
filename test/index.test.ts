import { Authorization, IADSettings, UserAD } from '../src/index';
import fetch, {Headers} from 'cross-fetch'
//import 'jest-canvas-mock';
//import { describe } from "node:test";

const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');

describe('Authorizaton', () => {
  
  const mock1Response: Response = {
    text: () =>
      Promise.resolve(`{
      id: '00000000-0000-0000-0000-000000000000',
      secret: 'TestPwd',
      user: 'TestUser',
      idUser: '00000000-0000-0000-0000-000000000000',
      saa: false
    }`),
    headers: headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'Ok',
    type: 'default',
    url: 'https://testURL/Autorisation/App',
    clone: () => {
      return mock1Response;
    },
    body: null,
    bodyUsed: true,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        resolve(new ArrayBuffer(8));
      }),
    blob: () =>
      new Promise<Blob>((resolve) => {
        resolve(new Blob());
      }),
    formData: () =>
      new Promise<FormData>((resolve) => {
        let f: FormData = new FormData();
        resolve(f);
      }),
    json: () =>
      Promise.resolve({
        id: '00000000-0000-0000-0000-000000000000',
        secret: 'TestPwd',
        user: 'TestUser',
        idUser: '00000000-0000-0000-0000-000000000000',
        saa: false
      })
  };

  const mock2Response: Response = {
    text: () =>
      Promise.resolve(`{
      id: '11111111-1111-1111-1111-111111111111',
      secret: 'TestPwd',
      user: 'TestUser',
      idUser: '10011100-0110-0001-1100-111110000000',
      saa: true
    }`),
    headers: headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'Ok',
    type: 'default',
    url: 'https://testURL/Autorisation/App',
    clone: () => {
      return mock2Response;
    },
    body: null,
    bodyUsed: true,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        resolve(new ArrayBuffer(8));
      }),
    blob: () =>
      new Promise<Blob>((resolve) => {
        resolve(new Blob());
      }),
    formData: () =>
      new Promise<FormData>((resolve) => {
        let f: FormData = new FormData();
        resolve(f);
      }),
    json: () =>
      Promise.resolve({
        id: '11111111-1111-1111-1111-111111111111',
        secret: 'TestPwd',
        user: 'TestUser',
        idUser: '10011100-0110-0001-1100-111110000000',
        saa: true
      })
  };

  const mock3Response: Response = {
    text: () => Promise.resolve(`{}`),
    headers: headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'Ok',
    type: 'default',
    url: 'https://testURL/Autorisation/App',
    clone: () => {
      return mock3Response;
    },
    body: null,
    bodyUsed: true,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        resolve(new ArrayBuffer(8));
      }),
    blob: () =>
      new Promise<Blob>((resolve) => {
        resolve(new Blob());
      }),
    formData: () =>
      new Promise<FormData>((resolve) => {
        let f: FormData = new FormData();
        resolve(f);
      }),
    json: () => Promise.resolve({})
  };

  const mock4Response: Response = {
    text: () => Promise.resolve(`{ sessionId: 'f033f62b-01fe-4d4e-85d9-055ed0bfd431' }`),
    headers: headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'Ok',
    type: 'default',
    url: 'https://testURL/Autorisation/App',
    clone: () => {
      return mock4Response;
    },
    body: null,
    bodyUsed: true,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        resolve(new ArrayBuffer(8));
      }),
    blob: () =>
      new Promise<Blob>((resolve) => {
        resolve(new Blob());
      }),
    formData: () =>
      new Promise<FormData>((resolve) => {
        let f: FormData = new FormData();
        resolve(f);
      }),
    json: () => Promise.resolve({ sessionId: 'f033f62b-01fe-4d4e-85d9-055ed0bfd431' })
  };

  test('Auth APP error', async () => {
    global.fetch = fetch;
    global.fetch = jest.fn(() => Promise.resolve(mock1Response));
    const sett: IADSettings = {
      MainAdress: 'https://testURL/',
      AuthAdress: {
        Main: 'Autorisation/',
        User: 'User',
        App: 'App'
      },
      UserAdress:{
        Adress:'',
        All:'',
        Curent:''
      }
    };
    Authorization.AppId = '00000000-0000-0000-0000-000000000000';
    Authorization.IdUser = '00000000-0000-0000-0000-000000000000';
    Authorization.User = 'TestUser';
    Authorization.AppSecret = 'TestPwd';
    try {
      await Authorization.Authorize(sett);
    } catch (e) {
      const ee = new Error('Authorisation APP Failed!');
      expect(e).toStrictEqual(ee);
    }
  });

  test('Auth User error', async () => {
    global.fetch = (inp) => {
      const ri = inp as Request;
      let url: string;
      if (ri.url) {
        url = ri.url;
      } else {
        url = inp as string;
      }
      if (url.endsWith('App')) {
        return Promise.resolve(mock2Response);
      } else {
        return Promise.resolve(mock3Response);
      }
    };
    const sett: IADSettings = {
      MainAdress: 'https://testURL/',
      AuthAdress: {
        Main: 'Autorisation/',
        User: 'User',
        App: 'App'
      },
      UserAdress:{
        Adress:'',
        All:'',
        Curent:''
      }
    };
    Authorization.AppId = '11111111-1111-1111-1111-111111111111';
    Authorization.AppSecret = 'TestPwd';
    Authorization.IdUser = '10011100-0110-0001-1100-111110000000';
    Authorization.User = 'TestUser';
    try {
      await Authorization.Authorize(sett);
      throw new Error('Test not Work!');
    } catch (e) {
      const ee = new Error('Authorisation User Failed!');
      expect(e).toStrictEqual(ee);
    }
  });

  test('Auth User normal', async () => {
    global.fetch = (inp) => {
      const ri = inp as Request;
      let url: string;
      if (ri.url) {
        url = ri.url;
      } else {
        url = inp as string;
      }
      if (url.endsWith('App')) {
        return Promise.resolve(mock2Response);
      } else {
        return Promise.resolve(mock4Response);
      }
    };
    const sett: IADSettings = {
      MainAdress: 'https://testURL/',
      AuthAdress: {
        Main: 'Autorisation/',
        User: 'User',
        App: 'App'
      },
      UserAdress:{
        Adress:'',
        All:'',
        Curent:''
      }
    };
    Authorization.AppId = '11111111-1111-1111-1111-111111111111';
    Authorization.AppSecret = 'TestPwd';
    Authorization.IdUser = '10011100-0110-0001-1100-111110000000';
    Authorization.User = 'TestUser';
    await Authorization.Authorize(sett);
    expect(Authorization.SessionId).toBe('f033f62b-01fe-4d4e-85d9-055ed0bfd431');
  });
});

describe('UserAD',()=>{
  const settings:IADSettings={
    MainAdress:'https://tech.chsu.ru/ra/',
    AuthAdress:{
      Main:"Autorisation/",
      App:"App",
      User:"User"
    },
    UserAdress:{
      Adress:"ADUsers/",
      All:"All",
      Curent:"Curent"
    }
  }
  const mock1Response: Response = {
    text: () =>
      Promise.resolve(`[
        {
              id: 'iiivanov',
              title: 'Иванов Иван Иванович',
              loginName: 'iiivanov@chsu.ru',
              post: 'работник',
              email: 'iiivanov@chsu.ru',
              firstName: 'Иванов',
              secondName: 'Иван',
              thirdName: 'Иванович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: ''
          },
        {
              id: 'sssidorov',
              title: 'Сидоров Сидор Сидорович',
              loginName: 'sssidorov@chsu.ru',
              post: 'работник',
              email: 'sssidorov@chsu.ru',
              firstName: 'Сидоров',
              secondName: 'Сидор',
              thirdName: 'Сидорович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: true,
              staff: true,
              studyGroup: '1ПМ-20-44'
          },
        {
              id: 'pppetrov',
              title: 'Петров Петр Петрович',
              loginName: 'pppetrov@chsu.ru',
              post: '',
              email: 'pppetrov@chsu.ru',
              firstName: 'Петров',
              secondName: 'Петр',
              thirdName: 'Петрович',
              departament: 'МИФИ',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: '1ПМ-20-44'
          },
        {
              id: 'ipivanov',
              title: 'Иванов Иван Петрович',
              loginName: 'ipivanov@chsu.ru',
              post: 'работник',
              email: 'ipivanov@chsu.ru',
              firstName: 'Иванов',
              secondName: 'Иван',
              thirdName: 'Петрович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: ''
          },
        {
              id: 'sisidorov',
              title: 'Сидоров Сидор Иванович',
              loginName: 'sssidorov@chsu.ru',
              post: 'работник',
              email: 'sssidorov@chsu.ru',
              firstName: 'Сидоров',
              secondName: 'Сидор',
              thirdName: 'Иванович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: true,
              staff: true,
              studyGroup: '1ПМ-20-44'
          }
      ]`),
    headers: headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'Ok',
    type: 'default',
    url: 'https://testURL/ADUsers/All',
    clone: () => {
      return mock1Response;
    },
    body: null,
    bodyUsed: true,
    arrayBuffer: () =>
      new Promise<ArrayBuffer>((resolve) => {
        resolve(new ArrayBuffer(8));
      }),
    blob: () =>
      new Promise<Blob>((resolve) => {
        resolve(new Blob());
      }),
    formData: () =>
      new Promise<FormData>((resolve) => {
        let f: FormData = new FormData();
        resolve(f);
      }),
    json: () =>
      Promise.resolve([
        {
              id: 'iiivanov',
              title: 'Иванов Иван Иванович',
              loginName: 'iiivanov@chsu.ru',
              post: 'работник',
              email: 'iiivanov@chsu.ru',
              firstName: 'Иванов',
              secondName: 'Иван',
              thirdName: 'Иванович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: ''
          },
        {
              id: 'sssidorov',
              title: 'Сидоров Сидор Сидорович',
              loginName: 'sssidorov@chsu.ru',
              post: 'работник',
              email: 'sssidorov@chsu.ru',
              firstName: 'Сидоров',
              secondName: 'Сидор',
              thirdName: 'Сидорович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: true,
              staff: true,
              studyGroup: '1ПМ-20-44'
          },
        {
              id: 'pppetrov',
              title: 'Петров Петр Петрович',
              loginName: 'pppetrov@chsu.ru',
              post: '',
              email: 'pppetrov@chsu.ru',
              firstName: 'Петров',
              secondName: 'Петр',
              thirdName: 'Петрович',
              departament: 'МИФИ',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: '1ПМ-20-44'
          },
        {
              id: 'ipivanov',
              title: 'Иванов Иван Петрович',
              loginName: 'ipivanov@chsu.ru',
              post: 'работник',
              email: 'ipivanov@chsu.ru',
              firstName: 'Иванов',
              secondName: 'Иван',
              thirdName: 'Петрович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: false,
              staff: true,
              studyGroup: ''
          },
        {
              id: 'sisidorov',
              title: 'Сидоров Сидор Иванович',
              loginName: 'sssidorov@chsu.ru',
              post: 'работник',
              email: 'sssidorov@chsu.ru',
              firstName: 'Сидоров',
              secondName: 'Сидор',
              thirdName: 'Иванович',
              departament: 'Работники',
              adminTS: null,
              adminA: null,
              student: true,
              staff: true,
              studyGroup: '1ПМ-20-44'
          }
      ])
  };

  test('GetALL load', async()=>{
    global.fetch= jest.fn(() => Promise.resolve(mock1Response));    
    UserAD.Settings=settings;
    const res = await UserAD.GetAll();
    expect(res.length).toBe(5);
  })

  test('GetALL sort', async()=>{
    global.fetch= jest.fn(() => Promise.resolve(mock1Response));    
    UserAD.Settings=settings;
    const res = await UserAD.GetAll();
    expect(res[1].id).toBe('ipivanov');
  })

  test('GetALL bufer', async()=>{
    global.fetch= jest.fn(() => Promise.resolve(mock1Response));    
    UserAD.Settings=settings;
    const res = await UserAD.GetAll();
    expect(UserAD.All).toBe(res);
  })
  
});
