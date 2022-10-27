# API for connect to AD
packadge for connetct to API AD

## Authorization
==============

`AppId` writeonly to set APP identifier 

`AppSecret` writeonly to set APP pasword

`User` writeonly to set APP User

`IdUser` writeonly to set APP User identifier

`SessionId` readonly return guid session

`Authorize(settings: IADSettings)` void to setup authorization

`Reset()` void to reset authorization


### Example
==============
```js
    Authorization.AppId = '00000000-0000-0000-0000-000000000000';
    Authorization.IdUser = '00000000-0000-0000-0000-000000000000';
    Authorization.User = 'TestUser';
    Authorization.AppSecret = 'TestPwd';
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
    await Authorization.Authorize(sett);
```

## UserAD
==============

### Properties
```ts
    /** user name (login)*/
    public id: string;
    /** full user name*/
    public title: string;
    /**login on AD*/
    public loginName: string;
    /** post on irganisation*/
    public post?: string | undefined;
    /**user email*/
    public email: string;
    /**First name*/
    public firstName: string;
    /**Second Name*/
    public secondName: string;
    /**Third Name*/
    public thirdName: string;
    /**departament where user work*/
    public departament?: string | undefined;
    /**user is a staff*/
    public staff: boolean;
    /**user is a student*/
    public student: boolean;
    /**if the user is a student, then the name of the priority study group*/
    public studyGroup?: string | undefined;
```
