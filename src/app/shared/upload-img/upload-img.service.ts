import { MainService } from './../../service/main.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadImgService {

  constructor(private mainSer: MainService) { }

  public uploadImg(fileElement, callback) {
    let countDelete = 0
    this.mainSer.APIServ.uploadImage("uploadFiles/image/upload", [fileElement], 1).subscribe((data: any) => {
      callback(null, data)
    }, error => {
      callback(error, null)
    })
  }

}
