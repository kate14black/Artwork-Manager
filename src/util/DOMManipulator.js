import gravatar from 'gravatar-api'

function getGravatarImage (email = '') {
  const gravatarOptions = {
    email: email,
    parameters: { 'size': '104', 'd': 'mm' },
    secure: true
  };

  return email && email.trim() !== '' ? gravatar.imageUrl(gravatarOptions) : null
}

export const avatarCanvasElement = function (email) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    const gravatar = getGravatarImage(email);
    image.src = gravatar;
    image.addEventListener('load', function () {
      const avatarCanvas = document.createElement('canvas');
      const avatarContext = avatarCanvas.getContext('2d');
      avatarCanvas.height = this.height;
      avatarCanvas.width = this.width;
      avatarContext.drawImage(this, 0, 0, this.width, this.height);
      resolve(avatarCanvas, gravatar);
    })
  })
};
