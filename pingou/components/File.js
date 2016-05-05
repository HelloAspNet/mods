import React, {Component} from 'react';
import Q from 'q';

class File extends Component {

  constructor(props) {
    super(props);
  }

  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  loadImages(files){
    console.log('files: ', files);
    const fileList = Object.keys(files).map(i => files[i]);
    const promiseList = fileList.map(file => {
      const defer = Q.defer();
      const reader = new FileReader;
      reader.addEventListener('load', () => {
        const image = new Image;
        image.src = reader.result;
        image.alt = file.name;
        console.log(reader,file)
        image.addEventListener('load', e => defer.resolve(image));
      });
      reader.readAsDataURL(file);
      return defer.promise;
    });
    return Q.all(promiseList).then(([...imageList]) => imageList);
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    this.load(files).then(imageList => console.log(imageList));
    return false;
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default File;