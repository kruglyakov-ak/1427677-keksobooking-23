const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatar = {
  fileChooser: document.querySelector('#avatar'),
  previewContainer: document.querySelector('.ad-form-header__preview'),
  alt: 'Аватар пользователя',
  width: '40',
  height: '44',
};

const photo = {
  fileChooser: document.querySelector('#images'),
  previewContainer: document.querySelector('.ad-form__photo'),
  alt: 'Фотография жилья',
  width: '70',
  height: '70',
};

const onChangeFileCooser = ({ fileChooser, previewContainer, alt, width, height }) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        previewContainer.innerHTML = `<img src="${reader.result}" alt="${alt}" width="${width}" height="${height}">`;
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetFileCooserPreview = () => {
  avatar.previewContainer
    .innerHTML = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';
  photo.previewContainer.innerHTML = '';
};

onChangeFileCooser(avatar);
onChangeFileCooser(photo);

export {
  resetFileCooserPreview
};
