import Q from 'q';

class File {

  constructor(){}

  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const fileList = Object.keys(files).map(i => files[i]);
    const promiseList = fileList.map(file => {
      const defer = Q.defer();
      const reader = new FileReader;
      reader.addEventListener('load', () => {
        const image = new Image;
        image.src = reader.result;
        image.alt = file.name;
        image.addEventListener('load', e => defer.resolve(image));
      });
      reader.readAsDataURL(file);
      return defer.promise;
    });

    console.log('files: ', files);

    Q.all(promiseList).then(([...imageList]) => {

      this.props.onBgListInit(imageList);

      this.state.imageList = imageList.map((image, i) => <li key={i}>{image.alt}</li>);
      this.setState(this.state);
    });


    return false;
  }
}

export default File;