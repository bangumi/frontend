import type { Wiki } from '@bgm38/wiki';
import { WikiArrayItem, WikiItem } from '@bgm38/wiki';
import { nanoid } from 'nanoid';

type Value = string | WikiElement[];

export class WikiElement {
  _id: string;
  key: string | undefined;
  value: Value | undefined;

  constructor(params?: Partial<{ id: string; key: string; value: Value }>) {
    const { id = nanoid(), key, value } = params ?? {};
    this._id = id;
    this.key = key;
    this.value = value;
  }
}

export const toWikiElement = (wiki: Wiki) =>
  wiki.data.map((item) => {
    return new WikiElement({
      key: item.key,
      value: Array.isArray(item.values)
        ? item.values.map(
            (i) =>
              new WikiElement({
                key: i.k,
                value: i.v,
              }),
          )
        : item.value,
    });
  });

export const fromWikiElement = (elements: WikiElement[]): WikiItem[] =>
  elements.map((el) => {
    const value = el.value;
    const initWikiItemValue = typeof value === 'string' ? value : '';
    const item = new WikiItem(el.key ?? '', initWikiItemValue, 'object');
    if (Array.isArray(value) && el.key) {
      item.array = true;
      item.values = value.map((v) => new WikiArrayItem(v.key, v.value as string));
    }
    return item;
  });
