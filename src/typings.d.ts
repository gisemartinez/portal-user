/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface EnvConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  port: string;
  migrationStorage : string;
  adminDashboard: string;
  radiusServer: string;
  TOKEN_SECRET: string;
  socialMediaKeys: {
    facebook:{
      clientId:string;
      secret: string;
    },
    google:{
      clientId:string;
      secret: string;
    }
  }
}
