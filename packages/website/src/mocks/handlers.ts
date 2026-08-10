import { mockAPI } from './utils';

export const handlers = [mockAPI('/p1/me', 'get'), mockAPI('/p1/home', 'get')];
