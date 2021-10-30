import './util.js';
import './pictures.js';
import './upload-form.js';
import './photo-scale.js';
import './photo-effects.js';
import './api.js';
import {getPhotos} from './api.js';
import {showAlert} from './util.js';

getPhotos(showAlert);
