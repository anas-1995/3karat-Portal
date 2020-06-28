export class appError {
    status: number;
    message: string;
  
    constructor(error) {
      this.status = error.status || 0;
      this.message = error.message || "";   
    }

    returnMessage(){
      if(this.status==401){
        return "ERROR_FORM.LOGIN_FIELD";
      }
    }
  }
  