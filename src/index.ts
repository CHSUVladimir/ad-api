export function helloWorld(){
    return 'Hello world!'
  }

  export interface IADAuthAdress{
    Main:string;
    App:string,
    User:string;
  }

  export interface IADAuth{
        Id:string; 
        Secret:string; 
        User:string; 
        IdUser:string;
    }

  export interface IADSettings{
    MainAdress:string;
    AuthAdress:IADAuthAdress;
    Auth:IADAuth;

  }

