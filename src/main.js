import 'bootstrap';
import $ from 'jquery';
import { search } from './eventListeners';

$("#search-btn").on("click", search);
