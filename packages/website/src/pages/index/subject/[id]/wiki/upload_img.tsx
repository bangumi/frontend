import { ok } from 'oazapfts';
import React, { useState } from 'react';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import { Button, Divider, Image, Layout, Message, toast, Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import { useWikiContext } from '../wiki';
import style from './common.module.less';

interface WikiCoverItemProp {
  id: number;
  thumbnail: string;
  creator: {
    username: string;
    nickname: string;
  };
  votable?: boolean;
  voted?: boolean;
  onCommentUpdate?: () => Promise<unknown>;
}

const WikiCoverItem: React.FC<WikiCoverItemProp> = ({
  id,
  thumbnail,
  creator,
  votable = false,
  voted,
  onCommentUpdate,
}) => {
  const { subjectId } = useWikiContext();
  const [loadingVote, setLoadingVote] = useState(false);
  const url = getUserProfileLink(creator.username);

  const voteCover = async (coverId: number, voted: boolean) => {
    if (!coverId || isNaN(coverId)) {
      toast('封面 ID 有误！', { type: 'error' });
      return;
    }
    setLoadingVote(true);
    try {
      const res = await (voted
        ? ozaClient.unvoteSubjectCover(subjectId, coverId)
        : ozaClient.voteSubjectCover(subjectId, coverId));
      if (res.status === 200) {
        toast('操作成功！');
        onCommentUpdate?.();
      } else {
        toast(res.data.message, { type: 'error' });
        console.error(res.data);
      }
    } catch (err: unknown) {
      toast('未知错误', { type: 'error' });
      console.error(err);
    } finally {
      setLoadingVote(false);
    }
  };

  return (
    <div className={style.uploadImgCoverItem}>
      <div className={style.uploadImgCoverItemImg}>
        <Image src={thumbnail} alt={`cover-${id}`} />
      </div>
      <div className={style.uploadImgCoverItemInfo}>
        <span>by</span>
        <Typography.Link to={url} fontWeight='bold'>
          {creator.nickname}
        </Typography.Link>
      </div>
      {votable && (
        <Button
          size='small'
          type='text'
          disabled={loadingVote}
          onClick={() => {
            voteCover(id, voted!);
          }}
        >
          {loadingVote ? '···' : voted ? '撤消' : '投票'}
        </Button>
      )}
    </div>
  );
};

/**
 * @description: 对于过长的图片名，截取前后固定长度返回
 * @return 处理后的图片名
 */
const getShortName = (name: string): string => {
  if (name.length <= 45) {
    return name;
  }
  const fore = name.slice(0, 35);
  const aft = name.slice(-10);
  return `${fore}……${aft}`;
};

/**
 * @description: 将图片以base64编码
 * @return 图片名与base64字符串
 */
const readAsBase64 = async (img: File): Promise<[string, string]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const code = reader.result as string;
      resolve([img.name, code.replace(/^data:image\/\w+;base64,/, '')]);
    };
    reader.onerror = (err: unknown) => {
      reject(err);
    };
    reader.readAsDataURL(img);
  });
};

const WikiUploadImgPage: React.FC = () => {
  const { subjectId } = useWikiContext();

  const { data, mutate } = useSWR(
    `/p1/wiki/subjects/${subjectId}/covers`,
    async () => ok(ozaClient.listSubjectCovers(subjectId)),
    { suspense: true },
  );

  const { covers, current } = data;
  const currentWithCreator = current ? covers.find((cover) => cover.id === current.id) : undefined;

  const uploadNameInitial = '尚未选择任何本地文件';
  const [uploadName, setUploadName] = useState(uploadNameInitial); // 待上传图片名（展示在页面上）
  const [uploadContent, setUploadContent] = useState(''); // 待上传图片的base64编码
  const [loadingUpload, setLoadingUpload] = useState(false); // “上传图片”按钮的loading

  /**
   * @description: input:file的change监听事件，包括前置校验与图片解析
   */
  const readImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.target.files?.[0];
    if (!img) {
      toast('未选择图片', { type: 'error' });
      setUploadName(uploadNameInitial);
      setUploadContent('');
      return;
    }
    if (img.size >= 4 * 1024 * 1024) {
      toast('上传图片原始大小应该小于4mb', { type: 'error' });
      return;
    }
    try {
      setUploadName('加载中…');
      const [name, base64] = await readAsBase64(img);
      setUploadName(name);
      setUploadContent(base64);
    } catch (err: unknown) {
      toast('解析图片失败！', { type: 'error' });
      setUploadName(uploadNameInitial);
      setUploadContent('');
      console.error(err);
    }
  };

  const uploadCover = async () => {
    // 可能的用户错误类型
    const userErrorCodeObj: Record<string, string> = {
      NOT_ALLOWED: '无操作该条目的权限！',
      IMAGE_FILE_TOO_LARGE: '上传文件过大！',
      IMAGE_FORMAT_NOT_SUPPORT: '上传文件格式仅限：jpeg, jpg, png, webp',
    };
    if (!uploadContent) {
      toast('未找到上传图片！', { type: 'error' });
      return;
    }
    try {
      setLoadingUpload(true);
      const res = await ozaClient.uploadSubjectCover(subjectId, { content: uploadContent });
      if (res.status === 200) {
        setUploadContent('');
        setUploadName(uploadNameInitial);
        toast('操作成功！');
        mutate();
      } else {
        const userMsg: string | undefined = userErrorCodeObj[res.data.code];
        toast(userMsg ?? res.data.message, { type: 'error' });
        console.error(res.data);
      }
    } catch (err: unknown) {
      toast('未知错误', { type: 'error' });
      console.error(err);
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <Layout
      type='alpha'
      leftChildren={
        <div className={style.uploadImg}>
          {currentWithCreator && (
            <>
              <div className={style.title}>目前得票最高的封面图片</div>
              <Divider className={style.divider} />
              <div className={style.uploadImgCoverSelected}>
                <WikiCoverItem
                  id={currentWithCreator.id}
                  creator={currentWithCreator.creator}
                  thumbnail={currentWithCreator.thumbnail}
                />
              </div>
            </>
          )}
          {covers.length > 0 && (
            <>
              <div className={style.title}>已上传的封面图片</div>
              <Divider className={style.divider} />
              <div className={style.uploadImgCoverUploaded}>
                {covers.map((cover) => {
                  return (
                    <WikiCoverItem
                      key={cover.id}
                      id={cover.id}
                      votable
                      voted={cover.voted}
                      creator={cover.creator}
                      thumbnail={cover.thumbnail}
                      onCommentUpdate={mutate}
                    />
                  );
                })}
              </div>
            </>
          )}
          <div className={style.title}>从你的电脑上选择新的图片</div>
          <Divider className={style.divider} />
          <Message type='error'>
            请确保你的图片符合相关规定，任何包含 R18 或敏感内容的图片都会被直接移除
          </Message>
          <div className={style.uploadImgBottom}>
            <label htmlFor='coverUploader'>选择本地文件</label>
            <input
              type='file'
              id='coverUploader'
              name='coverUploader'
              accept='.webp,.jpg,.jpeg,.png'
              onChange={readImage}
            />
            <span title={uploadName}>{getShortName(uploadName)}</span>
          </div>
          {uploadContent && (
            <Button
              className={style.uploadImgBtn}
              color='blue'
              onClick={uploadCover}
              type='primary'
              disabled={loadingUpload}
            >
              {loadingUpload ? '···' : '上传图片'}
            </Button>
          )}
        </div>
      }
    />
  );
};

export default withErrorBoundary(WikiUploadImgPage);
