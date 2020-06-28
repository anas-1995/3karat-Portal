import { appError } from './../../models/app-error.model';
import { UploadImgService } from './upload-img.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {

  constructor(private uploadImgSer: UploadImgService) { }
  @Input() image: Image;
  @Input() arrayImage: Image[];


  @Output() getImageChange = new EventEmitter<Image>();
  @Output() getarrayImageChange = new EventEmitter<any[]>();


  @Input() isMultiImg: boolean = false;
  @Input() isWithAdd: boolean = true;


  ngOnInit() {
  }

  imageOnLoad = []
  imageOnLoadArray = []


  onChange(event: any) {
    let self = this;
    let files = [].slice.call(event.target.files);
    let allFilles = event.target.files;

    if (this.isMultiImg == false) {
      this.imageOnLoad = Array(files.length);
    }
    else
      this.imageOnLoadArray = Array(files.length);

    var innerIndex = 0;
    for (var i = 0; i < allFilles.length; i++) {
      var file = allFilles[i];
      var x;
      console.log("fromOut");
      console.log(i);
      this.releadImage(i, file);
    }

    files.forEach((fileElement, index) => {
      this.uploadImgSer.uploadImg(fileElement, function (err: appError, media) {
        if (err)
          console.log(err.returnMessage())
        // appError.returnMessage()
        else {
          if (self.isMultiImg == false) {
            self.imageOnLoad = [];
            self.image = media[0]
            console.log(self.image)
            console.log(media)
            self.getImageChange.emit(media[0])
          }
          else {
            self.imageOnLoadArray = [];
            self.arrayImage.push(media[0])
            self.getarrayImageChange.emit(self.arrayImage)
          }
        }
      })
    });

  }

  deleteImg(index) {
    this.arrayImage.splice(index,1)
    this.getarrayImageChange.emit(this.arrayImage)

  }
  releadImage(innerIndex, file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var id = 'uploadImage' + innerIndex;
      document.getElementById(id).setAttribute('src', reader.result);
      // this.text = reader.result;
    }
    reader.readAsDataURL(file);
  }
}
