import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import 'firebase/storage';

export interface FileListItem {
  path: string;
  display_name?: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() label = 'Upload File';
  @Input() stream: boolean;
  @Input() progressBar = false;
  @Input() path: string;
  @Input() files: FileListItem[];
  @Output() progress: EventEmitter<any> = new EventEmitter();
  @Output() uploaded: EventEmitter<any> = new EventEmitter();

  public file;
  public fileData;
  public downloadUrl;

  public uploadPercentage;

  get isUploading() {
    return this.uploadPercentage > 0 && this.uploadPercentage < 100;
  }

  private messageRef;

  private storage = firebase.storage();

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  detectFiles(event, type = 'upload') {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.fileData = reader.result;
      this.upload();
    };

    if (this.stream) {
      reader.readAsBinaryString(this.file);
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  upload() {
    if (this.stream) {
      this.loadStream();
    } else {
      this.uploadToCdn();
    }
  }

  uploadToCdn() {
    this.showMessage('Uploading file to CDN');
    const fileRef = this.storage.ref(this.path + '/' + this.file.name);
    const upload = fileRef.put(this.file);

    // load the upload data
    upload.then((snapshot: any) => {
      const url = snapshot.ref.getDownloadURL().then(url => {
        this.showMessage('File successfully uploaded');
        this.downloadUrl = url;
        this.notify();
        if (this.files) {
          this.files.push({
            path: url
          });
        }
        this.clearUpload();
      });
    });

    // watch upload progress
    upload.on('state_changed', uploadState => {
      const progress = (uploadState.bytesTransferred / uploadState.totalBytes) * 100;
      this.uploadPercentage = progress;
      this.progress.emit(progress);
    });
  }

  loadStream() {
    const file = {
      lastModified: this.file.lastModified,
      name: this.file.name,
      size: this.file.size,
      type: this.file.type,
      path: this.path,
      data: this.fileData
    }
    this.uploaded.emit(file);
  }

  notify() {
    const file = {
      lastModified: this.file.lastModified,
      name: this.file.name,
      size: this.file.size,
      type: this.file.type,
      path: this.path,
      downloadUrl: this.downloadUrl,
      data: this.fileData
    }
    this.uploaded.emit(file);
  }

  clearUpload() {
    this.file = null;
    this.fileData = null;
  }

  showMessage(message) {
    if (this.messageRef) {
      this.messageRef.dismiss();
    }

    this.messageRef = this.snackbar.open(message, 'close', {
      duration: 3000
    });
  }
}
