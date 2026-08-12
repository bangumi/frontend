import { css } from '@bangumi/styled-system/css';

export const title = css({
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '18px',
  color: '#9f9b9b',
});

export const divider = css({
  marginTop: '15px',
  marginBottom: '30px',
  width: '100%',
  height: '1px',
  border: 'none',
  background: '#e8e3e3',
});

export const form = css({ width: '100%' });

export const formInput = css({
  flex: '1',
  '& > input': { height: '1.5rem' },
});

export const formInputGroup = css({ display: 'flex', flex: '1' });

export const formRadio = css({ paddingTop: '9px', paddingBottom: '9px' });

export const formSelect = css({ width: '170px' });

export const formTextArea = css({
  flex: '1',
  borderRadius: '12px',
  resize: 'vertical',
  border: '2px solid #e8e3e3',
  minHeight: '300px',
  padding: '9px',
  fontSize: '1rem',
  _focus: { outline: 'none' },
});

export const formButton = css({ width: '120px' });

export const tips = css({
  color: '#9f9b9b',
  width: '100%',
  fontSize: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const formDetailInfo = css({
  display: 'flex',
  flex: '1',
  gap: '10px',
  flexDirection: 'column',
});

export const history = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const historyItem = css({
  display: 'flex',
  gap: '0.625rem',
  height: '30px',
  borderBottom: '1px dashed #e8e3e3',
  '& > span': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const historyUserName = css({ color: '#54b5df' });

export const historyMsg = css({ maxWidth: '30%', color: '#595555' });

export const historyCreateAt = css({ width: '160px' });

export const historySuffix = css({ color: '#9f9b9b' });

export const historyMore = css({ alignSelf: 'end' });

export const editorHandbook = css({ marginBottom: '40px' });

export const editorHandbookContent = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  color: '#595555',
  lineHeight: '22px',
  '& > p': {
    paddingBottom: '12px',
    borderBottom: '1px dashed #e8e3e3',
  },
});

export const uploadImg = css({ marginBottom: '40px' });

// 原 .upload-img > .divider，divider 是共享哈希类无法用后代选择器，用 cx 组合 + [class] 提升优先级
export const uploadImgDivider = css({
  '&[class]': { marginBottom: '20px' },
});

// 原 .upload-img-cover-selected / .upload-img-cover-uploaded 共享同一组规则
export const uploadImgCover = css({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '20px',
  '& img': { objectFit: 'contain', maxWidth: '136px', maxHeight: '300px' },
});

export const uploadImgCoverItem = css({
  marginRight: '16px',
  marginBottom: '20px',
  maxWidth: '136px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const uploadImgCoverItemImg = css({
  flex: 'auto',
  display: 'flex',
  alignItems: 'center',
});

export const uploadImgCoverItemInfo = css({
  marginBlock: '10px',
  '& > span': {
    marginRight: '10px',
    verticalAlign: 'top',
    color: '#595555',
  },
  '& > a': {
    width: '100px',
    overflowWrap: 'break-word',
  },
});

export const uploadImgBottom = css({
  display: 'flex',
  alignItems: 'center',
  marginBlock: '20px',
  '& > label': {
    flex: '120px 0 0',
    height: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#595555',
    backgroundColor: '#e8e3e3',
    borderRadius: '19px',
    cursor: 'pointer',
  },
  '& > span': {
    fontSize: '0.875rem',
    fontWeight: '400',
    color: '#9f9b9b',
    marginInline: '20px',
  },
  "& > input[type='file']": {
    width: '1px',
    height: '1px',
    opacity: '0',
  },
});

export const uploadImgBtn = css({ width: '120px', height: '38px' });
