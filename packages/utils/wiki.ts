import type { Wiki } from '@bgm38/wiki';
import { WikiArrayItem, WikiItem } from '@bgm38/wiki';
import { nanoid } from 'nanoid';
import type { Key } from 'react';

type Value = string | WikiElement[];

export class WikiElement {
  _id: Key;
  isArray = false;
  key: string | undefined;
  value: Value | undefined;

  constructor(params?: Partial<{ id: Key; isArray: boolean; key: string; value: Value }>) {
    const { id = nanoid(), isArray, key, value } = params ?? {};
    this._id = id;
    isArray !== undefined && (this.isArray = isArray);
    this.key = key;
    this.value = value;
  }
}

export const toWikiElement = (wiki: Wiki) => {
  const element = new Array<WikiElement>(wiki.data.length);
  for (let i = 0; i < wiki.data.length; i++) {
    const item = wiki.data[i]!;
    const el = new WikiElement({
      key: item.key,
      value: item.value,
    });
    if (item.array === true) {
      el.isArray = true;
      el.value = [];
      for (const i of item.values ?? []) {
        const arrayItem = new WikiElement({
          key: i.k,
          value: i.v,
        });
        el.value.push(arrayItem);
      }
    }
    element[i] = el;
  }
  return element;
};

export const fromWikiElement = (elements: WikiElement[]): WikiItem[] => {
  const items = new Array<WikiItem>(elements.length);
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]!;
    const value = el.value;
    const initWikiItemValue = typeof value === 'string' ? value : '';
    const item = new WikiItem(el.key ?? '', initWikiItemValue, 'object');
    if (Array.isArray(value) && el.key) {
      const arrayItems = new Array<WikiArrayItem>(value.length);
      for (let j = 0; j < value.length; j++) {
        const v = value[j]!;
        arrayItems[j] = new WikiArrayItem(v.key, v.value as string);
      }
      item.array = true;
      item.values = arrayItems;
    }
    items[i] = item;
  }
  return items;
};
