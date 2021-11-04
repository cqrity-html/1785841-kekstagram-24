import './api.js';
import './filters.js';
import './messages.js';
import './photo-effects.js';
import './photo-scale.js';
import './pictures.js';
import './upload-form.js';
import './user-photo.js';
import './util.js';
import {getPhotos} from './api.js';
import {showAlert} from './messages.js';

getPhotos(showAlert);
