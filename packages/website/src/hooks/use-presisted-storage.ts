import { useEffect, useRef } from 'react';

type Getter = () => string;
interface Options {
  getter: Getter;
}
type PersistedStorage = <T>(
  id: string,
  options?: Options,
) => {
  /**
   * 从 storage 中获取的数据，没有则返回 null
   */
  data: T | null;
  /**
   * 存储数据时，将会调用该函数获取存储的数据
   *
   * 为什么需要这个？
   * 在一些场景，我们需要该 hook 提供的初始数据，来初始化其它 hook
   * 而 getter 又依赖那些 hook。见 edit_detail 页面
   */
  setGetter: (getter: Getter) => void;
  /**
   * 调用后，代表数据将不会被保存
   */
  finish: () => void;
};
export const usePersistedStorage: PersistedStorage = <T>(id: string, options?: Options) => {
  const _id = `resume:${id}`;
  const item = sessionStorage.getItem(_id);
  if (item) {
    sessionStorage.removeItem(_id);
  }
  const getterRef = useRef<null | Getter>(options?.getter ?? null);
  let finished = false;

  const setGetter = (getter: Getter) => {
    getterRef.current = getter;
  };

  useEffect(() => {
    return () => {
      // 组件 unmount 时存储
      if (!finished) {
        getterRef.current && sessionStorage.setItem(_id, getterRef.current());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    data: item ? (JSON.parse(item) as T) : null,
    setGetter,
    finish: () => {
      finished = true;
    },
  };
};
