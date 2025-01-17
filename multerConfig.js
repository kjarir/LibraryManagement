// multerConfig.js
import multer from 'multer';

// Set storage to memory so files are stored in memory instead of disk
const storage = multer.memoryStorage();
const upload = multer({
    storage,
});
export { upload };
