import React, {Component} from 'react';
import CONFIG from '../config';

class File extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    CONFIG.save();
  }

  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  loadImages(files){
    console.log('待加载文件列表: ', files);
    const fileList = Object.keys(files).map(i => files[i]);
    const promiseList = fileList.map(file => {
      return new Promise(function(resolve, reject){
        const reader = new FileReader;
        reader.addEventListener('load', () => {
          const image = new Image;
          image.src = reader.result;
          image.alt = file.name;
          image.addEventListener('load', e => resolve(image));
          image.addEventListener('error', e => reject(`图片(${file.name})载入失败`));
        });
        reader.addEventListener('error', e => reject(`文件(${file.name})读取失败`));
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promiseList).then(([...imageList]) => imageList);
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    this.loadImages(files).then(imageList => console.log(imageList));
    return false;
  }


  render() {
    return (
      <div></div>
    );
  }
}

export default File;