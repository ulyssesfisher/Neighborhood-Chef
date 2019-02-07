import 'bootstrap';
import $ from 'jquery';
import { search } from './eventListeners';

// Start the app
$("#search-btn").on("click", search);
