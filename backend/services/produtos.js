const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos JPEG, JPG e PNG são permitidos.'));
  }
};

const limits = {
  fileSize: 1024 * 1024 * 10 // Limite de 10MB
};

const upload = multer({
  storage,
  fileFilter,
  limits
}).single('src');

class ProductService {
  static upload(req, res, next) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  }

  static removeImage(filePath) {
    const fullPath = path.join(__dirname, '../uploads', filePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Erro ao remover a imagem:', err);
      } else {
        console.log('Imagem removida com sucesso.');
      }
    });
  }
}

module.exports = ProductService;
